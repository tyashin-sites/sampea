'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import {
  readCart,
  setQuantity,
  type CartData,
  type CartLine,
  type StoreClient,
} from '@/lib/cart-client';

function money(minor: number, currency: string, locale: string): string {
  try {
    const fmt = new Intl.NumberFormat(locale.replace('_', '-'), { style: 'currency', currency });
    return fmt.format(minor / 10 ** (fmt.resolvedOptions().maximumFractionDigits ?? 2));
  } catch {
    return `${(minor / 100).toFixed(2)} ${currency}`;
  }
}

/** The cart page body. Checkout is the platform's /checkout (same origin, same cart session). */
export function CartView({ client, locale }: { client: StoreClient; locale: string }) {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    readCart(client)
      .then(setCart)
      .catch(() => setError('Your cart could not be loaded. Please refresh the page.'))
      .finally(() => setLoading(false));
  }, [client]);

  async function change(line: CartLine, qty: number) {
    setError('');
    try {
      setCart(await setQuantity(client, line, Math.max(0, qty)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The cart could not be updated.');
    }
  }

  if (loading) return <p className="text-muted">Loading your cart…</p>;
  if (!cart || !cart.items.length) {
    return (
      <div className="bg-surface rounded-lg p-10 text-center">
        <p className="lead">Your cart is empty.</p>
        <p className="mt-6">
          <Link href="/shop" className="btn btn-primary">
            Browse the collection
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <ul className="divide-border grid divide-y">
        {cart.items.map((line) => (
          <li key={`${line.productId}-${line.variantId ?? ''}`} className="flex gap-5 py-6">
            {line.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={line.imageUrl}
                alt=""
                className="bg-surface h-24 w-20 shrink-0 rounded-md object-cover"
              />
            ) : (
              <div className="placeholder h-24 w-20 shrink-0 rounded-md" aria-hidden />
            )}
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex justify-between gap-4">
                <p className="font-medium">{line.name}</p>
                <p className="tt-mono text-sm">
                  {money(line.price * line.quantity, cart.currency, locale)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`One fewer ${line.name}`}
                  onClick={() => change(line, line.quantity - 1)}
                  className="border-border rounded-full border p-1.5"
                >
                  <Minus className="h-4 w-4" aria-hidden />
                </button>
                <span className="tt-mono w-8 text-center" aria-live="polite">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  aria-label={`One more ${line.name}`}
                  onClick={() => change(line, line.quantity + 1)}
                  className="border-border rounded-full border p-1.5"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => change(line, 0)}
                  className="text-muted ml-4 text-sm underline-offset-4 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="bg-surface h-fit rounded-lg p-6">
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tt-mono">{money(cart.subtotal, cart.currency, locale)}</dd>
          </div>
          {cart.discountAmount > 0 ? (
            <div className="flex justify-between">
              <dt>Discount</dt>
              <dd className="tt-mono">−{money(cart.discountAmount, cart.currency, locale)}</dd>
            </div>
          ) : null}
          {cart.taxAmount > 0 ? (
            <div className="flex justify-between">
              <dt>
                {cart.taxName}
                {cart.taxInclusive ? ' (included)' : ''}
              </dt>
              <dd className="tt-mono">{money(cart.taxAmount, cart.currency, locale)}</dd>
            </div>
          ) : null}
          <div className="border-border flex justify-between border-t pt-3 text-base font-medium">
            <dt>Total</dt>
            <dd className="tt-mono">{money(cart.total, cart.currency, locale)}</dd>
          </div>
        </dl>
        {/* A full navigation: /checkout is served by the platform, not this app. */}
        <a href="/checkout" className="btn btn-primary mt-6 w-full justify-center">
          Checkout
        </a>
        <p className="text-muted mt-3 text-xs">Shipping is worked out at checkout.</p>
        {error ? (
          <p role="alert" className="mt-4 text-sm">
            {error}
          </p>
        ) : null}
      </aside>
    </div>
  );
}
