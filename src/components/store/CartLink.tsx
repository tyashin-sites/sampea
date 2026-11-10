'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import {
  CART_EVENT,
  itemCount,
  readCart,
  type CartData,
  type StoreClient,
} from '@/lib/cart-client';

/** Header cart link with a live item count (reads a cart only if the visitor started one). */
export function CartLink({ client }: { client: StoreClient }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    readCart(client)
      .then((c) => setCount(itemCount(c)))
      .catch(() => undefined);
    const on = (e: Event) => setCount(itemCount((e as CustomEvent<CartData>).detail));
    window.addEventListener(CART_EVENT, on);
    return () => window.removeEventListener(CART_EVENT, on);
  }, [client]);
  return (
    <Link
      href="/cart"
      aria-label={count ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Cart'}
      className="hover:bg-surface relative inline-flex h-10 w-10 items-center justify-center rounded-full"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden />
      {count ? (
        <span className="bg-primary text-primary-contrast tt-mono absolute -right-0.5 -top-0.5 min-w-[1.15rem] rounded-full px-1 text-center text-[0.7rem] leading-[1.15rem]">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
