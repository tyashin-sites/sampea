'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { addToCart, type StoreClient } from '@/lib/cart-client';

type State = 'idle' | 'adding' | 'added' | 'error';

/** Adds one product (or the chosen variant) to the cart. Disabled until hydrated. */
export function AddToCart({
  client,
  productId,
  variants,
  soldOut,
}: {
  client: StoreClient;
  productId: string;
  variants?: { id: string; name: string }[];
  soldOut?: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<State>('idle');
  const [variant, setVariant] = useState(variants?.[0]?.id ?? '');
  const [message, setMessage] = useState('');
  useEffect(() => setReady(true), []);

  async function onAdd() {
    setState('adding');
    try {
      await addToCart(client, productId, 1, variant || undefined);
      setState('added');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'The cart could not be updated.');
      setState('error');
    }
  }

  return (
    <div className="grid gap-4">
      {variants && variants.length > 1 ? (
        <label className="grid gap-1.5 text-sm">
          <span>Option</span>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="border-border bg-background rounded-md border px-3 py-2.5"
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <button
        type="button"
        onClick={onAdd}
        disabled={!ready || soldOut || state === 'adding' || !client.apiKey}
        className="btn btn-primary justify-self-start disabled:opacity-60"
      >
        {soldOut ? 'Sold out' : state === 'adding' ? 'Adding…' : 'Add to cart'}
      </button>
      <p role="status" className="text-sm">
        {state === 'added' ? (
          <>
            Added to your cart.{' '}
            <Link href="/cart" className="underline underline-offset-4">
              View cart
            </Link>
          </>
        ) : state === 'error' ? (
          message
        ) : null}
      </p>
    </div>
  );
}
