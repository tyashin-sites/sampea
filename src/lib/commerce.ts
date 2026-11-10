/**
 * The store's data, read from the Tyashin e-commerce API on the SERVER (never
 * in the browser: the API key stays in process.env). Platform-owned file
 * (Website Studio kit), used only by sites built as an online store.
 *
 * Rules this encodes:
 *  - Never throws. A slow or failing API renders an empty, calm store, never a
 *    broken page. `getProduct` alone tells "missing" (→ 404) from "error".
 *  - Prices are integers in the currency's smallest unit; currency is
 *    store-wide (GET /store-info). Never hard-code a symbol.
 *  - A store is PURCHASABLE only once it can take a payment (a gateway or cash
 *    on delivery). Until then every product shows "Join the launch list"
 *    instead of a price and a buy button: a pre-launch brand never shows a
 *    price or a checkout it cannot honour.
 */
import { cache } from 'react';
import { TYASHIN_API_ORIGIN } from '@/config/site';

export interface StoreImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
  order?: number;
}

export interface StoreVariant {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  stock?: number;
  isActive?: boolean;
}

export interface StoreProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images?: StoreImage[];
  categoryId?: string;
  tags?: string[];
  sku?: string;
  stock?: number;
  trackInventory?: boolean;
  variants?: StoreVariant[];
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
}

export interface StoreCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
}

export interface StoreInfo {
  currency: string;
  paymentGateway: string;
  enableCod: boolean;
}

export interface StoreReviews {
  enabled: boolean;
  reviews: { _id?: string; rating: number; title?: string; body?: string; authorName?: string }[];
  stats: { averageRating: number; totalReviews: number };
}

export interface BlogPostSummary {
  title: string;
  slug: string;
}

/** Seconds a catalogue read is reused (Next fetch cache; detail routes render per request). */
export const STORE_REVALIDATE = 60;
const TIMEOUT_MS = 10_000;

function apiOrigin(): string {
  return (process.env.TYASHIN_API_URL || TYASHIN_API_ORIGIN).replace(/\/+$/, '');
}

/** Server-only: the project's public API key. */
export function storeApiKey(): string {
  return process.env.TYASHIN_API_KEY ?? '';
}

/** What client components (cart, add to cart) need to call the store API. */
export function storeClientConfig(): { origin: string; apiKey: string } {
  return { origin: apiOrigin(), apiKey: storeApiKey() };
}

type Fetched<T> = { ok: true; data: T } | { ok: false; status: number };

async function apiGet<T>(path: string): Promise<Fetched<T>> {
  const key = storeApiKey();
  if (!key) return { ok: false, status: 0 };
  try {
    const res = await fetch(`${apiOrigin()}/api/v1${path}`, {
      headers: { 'X-API-Key': key },
      next: { revalidate: STORE_REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, status: res.status };
    const body = (await res.json()) as { success?: boolean; data?: T };
    if (!body?.success || body.data === undefined) return { ok: false, status: 502 };
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, status: 0 };
  }
}

export const getStoreInfo = cache(async (): Promise<StoreInfo | null> => {
  const r = await apiGet<Partial<StoreInfo>>('/public/ecommerce/store-info');
  if (!r.ok) return null;
  return {
    currency: r.data.currency || 'USD',
    paymentGateway: r.data.paymentGateway || 'none',
    enableCod: Boolean(r.data.enableCod),
  };
});

/** True once the store can take a payment. Unknown (API down) counts as no. */
export function isPurchasable(store: StoreInfo | null): boolean {
  return Boolean(store && (store.paymentGateway !== 'none' || store.enableCod));
}

/** Live categories with products; null when the API could not be read (never 404 on that). */
export const fetchCategories = cache(async (): Promise<StoreCategory[] | null> => {
  const r = await apiGet<StoreCategory[]>('/public/ecommerce/categories');
  if (!r.ok || !Array.isArray(r.data)) return null;
  return r.data.filter((c) => (c.productCount ?? 1) > 0 && c.slug);
});

export async function getCategories(): Promise<StoreCategory[]> {
  return (await fetchCategories()) ?? [];
}

export async function getProducts(opts: { category?: string; limit?: number } = {}) {
  const qs = new URLSearchParams({ limit: String(opts.limit ?? 48) });
  if (opts.category) qs.set('category', opts.category);
  const r = await apiGet<StoreProduct[]>(`/public/ecommerce/products?${qs}`);
  return r.ok && Array.isArray(r.data) ? r.data : [];
}

export type ProductLookup =
  | { status: 'found'; product: StoreProduct }
  | { status: 'missing' }
  | { status: 'error' };

export const getProduct = cache(async (slug: string): Promise<ProductLookup> => {
  const r = await apiGet<StoreProduct>(`/public/ecommerce/products/${encodeURIComponent(slug)}`);
  if (r.ok) return { status: 'found', product: r.data };
  return r.status === 404 ? { status: 'missing' } : { status: 'error' };
});

export async function getRelatedProducts(slug: string, limit = 4): Promise<StoreProduct[]> {
  const r = await apiGet<{ products: StoreProduct[] }>(
    `/public/ecommerce/products/${encodeURIComponent(slug)}/related?limit=${limit}`
  );
  return r.ok && Array.isArray(r.data.products) ? r.data.products.slice(0, limit) : [];
}

/** Reviews show only when the store turned review display on AND has some (port skill §3a). */
export async function getReviews(productId: string): Promise<StoreReviews | null> {
  const r = await apiGet<StoreReviews>(
    `/public/ecommerce/products/${encodeURIComponent(productId)}/reviews?limit=10`
  );
  if (!r.ok || !r.data.enabled || !r.data.stats?.totalReviews) return null;
  return r.data;
}

/** Published posts, newest first. Empty when the blog has none (or is not installed). */
export async function getRecentPosts(limit = 3): Promise<BlogPostSummary[]> {
  const r = await apiGet<BlogPostSummary[]>(`/public/blog/posts?limit=${limit}`);
  return r.ok && Array.isArray(r.data) ? r.data.filter((p) => p.slug && p.title) : [];
}

export function primaryImage(p: StoreProduct): StoreImage | null {
  const imgs = p.images ?? [];
  return (
    imgs.find((i) => i.isPrimary) ??
    [...imgs].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0] ??
    null
  );
}

export function sortedImages(p: StoreProduct): StoreImage[] {
  const first = primaryImage(p);
  const rest = (p.images ?? [])
    .filter((i) => i !== first)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return first ? [first, ...rest] : rest;
}

/** Integer smallest-unit price → localised string ("₹1,499.00", "¥1,500"). */
export function formatPrice(minor: number, currency: string, locale: string): string {
  const tag = locale.replace('_', '-');
  try {
    const fmt = new Intl.NumberFormat(tag, { style: 'currency', currency });
    const digits = fmt.resolvedOptions().maximumFractionDigits ?? 2;
    return fmt.format(minor / 10 ** digits);
  } catch {
    return `${(minor / 100).toFixed(2)} ${currency}`;
  }
}

/** The major-unit decimal string schema.org Offer.price wants ("14.99"). */
export function offerPrice(minor: number, currency: string): string {
  try {
    const digits =
      new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
        .maximumFractionDigits ?? 2;
    return (minor / 10 ** digits).toFixed(digits);
  } catch {
    return (minor / 100).toFixed(2);
  }
}

/** Plain text from the product description (it may carry simple HTML). */
export function plainText(s: string | undefined): string {
  return (s ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}
