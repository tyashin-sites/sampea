import { getRelatedProducts, getStoreInfo, isPurchasable } from '@/lib/commerce';
import { ProductCard } from './ProductCard';

/** "You may also like": renders nothing when the store has no related products. */
export async function RelatedProducts({ slug }: { slug: string }) {
  const [store, related] = await Promise.all([getStoreInfo(), getRelatedProducts(slug, 3)]);
  if (!related.length) return null;
  const purchasable = isPurchasable(store);
  return (
    <section className="section" aria-labelledby="related-heading">
      <div className="container-x">
        <h2 id="related-heading" className="tt-2 mb-10">
          You may also like
        </h2>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p._id} product={p} store={store} purchasable={purchasable} />
          ))}
        </ul>
      </div>
    </section>
  );
}
