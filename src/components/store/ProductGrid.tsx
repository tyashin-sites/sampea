import Link from 'next/link';
import { getProducts, getStoreInfo, isPurchasable } from '@/lib/commerce';
import { ProductCard } from './ProductCard';

/**
 * The catalogue (all products, or one category). Reads the live catalogue on
 * the server; an empty or unreachable catalogue renders a calm note, never an
 * error or an empty grid.
 */
export async function ProductGrid({
  category,
  limit,
  heading,
}: {
  category?: string;
  limit?: number;
  heading?: string;
}) {
  const [store, products] = await Promise.all([getStoreInfo(), getProducts({ category, limit })]);
  const purchasable = isPurchasable(store);
  return (
    <section className="section" aria-label={heading ?? 'Products'}>
      <div className="container-x">
        {heading ? <h2 className="tt-2 mb-10">{heading}</h2> : null}
        {products.length ? (
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} store={store} purchasable={purchasable} />
            ))}
          </ul>
        ) : (
          <div className="bg-surface rounded-lg p-10 text-center">
            <p className="lead mx-auto max-w-xl">The collection is being prepared.</p>
            <p className="mt-4">
              <Link href="/contact" className="btn btn-ghost">
                Hear first when it opens
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
