import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { formatPrice, primaryImage, type StoreInfo, type StoreProduct } from '@/lib/commerce';

/** One catalogue tile. The price shows only while the store can sell (launch mode hides it). */
export function ProductCard({
  product,
  store,
  purchasable,
}: {
  product: StoreProduct;
  store: StoreInfo | null;
  purchasable: boolean;
}) {
  const img = primaryImage(product);
  return (
    <li className="group">
      <Link href={`/products/${product.slug}`} className="block focus-visible:outline-none">
        <div className="bg-surface relative aspect-[4/5] overflow-hidden rounded-md">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img.url}
              alt={img.alt || product.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="placeholder absolute inset-0" aria-hidden />
          )}
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-lg leading-snug group-hover:underline group-focus-visible:underline">
            {product.name}
          </h3>
          {purchasable && store && product.price > 0 ? (
            <p className="tt-mono text-muted shrink-0 text-sm">
              {formatPrice(product.price, store.currency, siteConfig.locale)}
            </p>
          ) : null}
        </div>
        {!purchasable ? <p className="text-muted mt-1 text-sm">Join the launch list</p> : null}
      </Link>
    </li>
  );
}
