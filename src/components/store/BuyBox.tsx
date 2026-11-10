import { siteConfig } from '@/config/site';
import {
  formatPrice,
  isPurchasable,
  storeClientConfig,
  type StoreInfo,
  type StoreProduct,
} from '@/lib/commerce';
import { AddToCart } from './AddToCart';
import { LaunchList } from './LaunchList';

/** Price + add to cart while the store sells; the launch list (no price) while it cannot. */
export function BuyBox({ product, store }: { product: StoreProduct; store: StoreInfo | null }) {
  if (!isPurchasable(store) || !store || product.price <= 0) {
    return <LaunchList context={product.name} />;
  }
  const variants = (product.variants ?? [])
    .filter((v) => v.isActive !== false)
    .map((v) => ({ id: String(v._id ?? v.id ?? v.name), name: v.name }));
  const soldOut = product.trackInventory !== false && (product.stock ?? 1) <= 0 && !variants.length;
  return (
    <div className="grid gap-6">
      <p className="tt-mono text-2xl">
        {formatPrice(product.price, store.currency, siteConfig.locale)}
        {product.compareAtPrice && product.compareAtPrice > product.price ? (
          <s className="text-muted ml-3 text-base">
            {formatPrice(product.compareAtPrice, store.currency, siteConfig.locale)}
          </s>
        ) : null}
      </p>
      <AddToCart
        client={storeClientConfig()}
        productId={product._id}
        variants={variants}
        soldOut={soldOut}
      />
    </div>
  );
}
