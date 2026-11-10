import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { Breadcrumbs, JsonLd } from '@/components/kit';
import { BuyBox, ProductGallery, RelatedProducts, Reviews } from '@/components/store';
import {
  breadcrumbLd,
  organizationLd,
  productLd,
  websiteLd,
  ORG_ID,
  WEBSITE_ID,
} from '@/lib/schema';
import {
  getCategories,
  getProduct,
  getStoreInfo,
  isPurchasable,
  offerPrice,
  plainText,
  primaryImage,
  sortedImages,
  type StoreProduct,
} from '@/lib/commerce';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string): Promise<StoreProduct | null> {
  const r = await getProduct(slug);
  if (r.status === 'error') throw new Error('The store could not be reached.');
  return r.status === 'found' ? r.product : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await load(slug);
  if (!p) return {};
  return pageMetadata({
    title: (p.seo?.metaTitle || p.name).slice(0, 60),
    description: (p.seo?.metaDescription || plainText(p.shortDescription || p.description)).slice(0, 155),
    path: `/products/${p.slug}`,
    image: p.seo?.ogImage || primaryImage(p)?.url,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await load(slug);
  if (!product) notFound();
  const [store, categories] = await Promise.all([getStoreInfo(), getCategories()]);
  const category = product.categoryId
    ? (categories.find((c) => c._id === String(product.categoryId)) ?? null)
    : null;
  const path = `/products/${product.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    ...(category ? [{ name: category.name, path: `/shop/${category.slug}` }] : []),
    { name: product.name, path },
  ];
  const seller = store && isPurchasable(store) && product.price > 0 ? store : null;
  const inStock = product.trackInventory === false || (product.stock ?? 0) > 0 || Boolean(product.variants?.length);
  const paragraphs = (product.description ?? '')
    .split(/<\/p>|\n\s*\n/)
    .map(plainText)
    .filter(Boolean);
  return (
    <>
      <JsonLd
        nodes={[
          organizationLd('Store'),
          websiteLd(),
          breadcrumbLd(crumbs),
          // Search engines treat a Product with no offer, review or rating as
          // an error, and a pre-launch product has no price: until the store
          // can sell, the page describes the product as an ItemPage instead.
          seller
            ? productLd({
                name: product.name,
                description: plainText(product.shortDescription || product.description).slice(0, 500),
                path,
                images: sortedImages(product).map((i) => i.url),
                sku: product.sku,
                offer: { price: offerPrice(product.price, seller.currency), currency: seller.currency, inStock },
              })
            : {
                '@type': 'ItemPage',
                '@id': `${siteUrl(path)}#webpage`,
                url: siteUrl(path),
                name: product.name,
                description: plainText(product.shortDescription || product.description).slice(0, 500),
                inLanguage: siteConfig.language,
                isPartOf: { '@id': WEBSITE_ID },
                about: { '@id': ORG_ID },
                ...(primaryImage(product)
                  ? { primaryImageOfPage: { '@type': 'ImageObject', url: primaryImage(product)!.url } }
                  : {}),
              },
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <ProductGallery product={product} />
          <div className="lg:pt-6">
            <h1 className="tt-display">{product.name}</h1>
            {product.shortDescription ? (
              <p className="lead mt-5">{plainText(product.shortDescription)}</p>
            ) : null}
            <div className="mt-8">
              <BuyBox product={product} store={store} />
            </div>
            {paragraphs.length ? (
              <div className="mt-10 grid gap-4 leading-relaxed">
                {paragraphs.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <Reviews productId={product._id} />
      <RelatedProducts slug={product.slug} />
    </>
  );
}
