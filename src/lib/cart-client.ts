/**
 * Browser half of the store: the cart. Platform-owned file (Website Studio kit).
 *
 * The cart session id lives in localStorage under `tyashin_session_id`, the
 * SAME key the platform-owned /checkout page reads, so the cart a visitor
 * fills here is the cart checkout charges. It is written only when the
 * visitor adds something to the cart (they asked for the service), and read
 * only where a cart can exist, so a visitor who never shops stores nothing.
 */

export const SESSION_KEY = 'tyashin_session_id';
/** Fired on window after any cart change so the header count refreshes. */
export const CART_EVENT = 'tyashin:cart';

export interface StoreClient {
  origin: string;
  apiKey: string;
}

export interface CartLine {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartData {
  items: CartLine[];
  subtotal: number;
  total: number;
  taxAmount: number;
  taxName: string;
  taxInclusive: boolean;
  discountAmount: number;
  currency: string;
}

export function existingSession(): string | null {
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function ensureSession(): string {
  const found = existingSession();
  if (found) return found;
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  try {
    window.localStorage.setItem(SESSION_KEY, id);
  } catch {
    /* private mode: the cart still works for this page view */
  }
  return id;
}

async function call(
  client: StoreClient,
  path: string,
  session: string,
  init?: { method: string; body?: unknown }
): Promise<CartData> {
  const res = await fetch(`${client.origin}/api/v1/public/ecommerce${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': client.apiKey,
      'X-Session-Id': session,
    },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const body = (await res.json().catch(() => null)) as {
    success?: boolean;
    data?: CartData;
    error?: { message?: string };
  } | null;
  if (!res.ok || !body?.success || !body.data) {
    throw new Error(body?.error?.message || 'The cart could not be updated.');
  }
  return body.data;
}

function announce(cart: CartData) {
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: cart }));
}

/** The visitor's cart, or null when they never started one (no session, no request). */
export async function readCart(client: StoreClient): Promise<CartData | null> {
  const session = existingSession();
  if (!session || !client.apiKey) return null;
  return call(client, '/cart', session);
}

export async function addToCart(
  client: StoreClient,
  productId: string,
  quantity = 1,
  variantId?: string
): Promise<CartData> {
  const cart = await call(client, '/cart/items', ensureSession(), {
    method: 'POST',
    body: { productId, quantity, ...(variantId ? { variantId } : {}) },
  });
  announce(cart);
  return cart;
}

export async function setQuantity(
  client: StoreClient,
  line: CartLine,
  quantity: number
): Promise<CartData> {
  const session = existingSession();
  if (!session) throw new Error('No cart yet.');
  const qs = line.variantId ? `?variantId=${encodeURIComponent(line.variantId)}` : '';
  const cart = await call(
    client,
    `/cart/items/${encodeURIComponent(line.productId)}${qs}`,
    session,
    {
      method: 'PATCH',
      body: { quantity },
    }
  );
  announce(cart);
  return cart;
}

export function itemCount(cart: CartData | null): number {
  return (cart?.items ?? []).reduce((n, l) => n + l.quantity, 0);
}
