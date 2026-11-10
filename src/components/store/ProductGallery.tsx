import { sortedImages, type StoreProduct } from '@/lib/commerce';

/** Product photos: the first large (it is the LCP image, so eager), the rest below it. */
export function ProductGallery({ product }: { product: StoreProduct }) {
  const imgs = sortedImages(product);
  if (!imgs.length) {
    return <div className="placeholder aspect-[4/5] rounded-md" aria-hidden />;
  }
  const [first, ...rest] = imgs;
  return (
    <div className="grid gap-4">
      <div className="bg-surface relative aspect-[4/5] overflow-hidden rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={first.url}
          alt={first.alt || product.name}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {rest.length ? (
        <ul className="grid grid-cols-2 gap-4">
          {rest.map((im) => (
            <li
              key={im.url}
              className="bg-surface relative aspect-[4/5] overflow-hidden rounded-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={im.url}
                alt={im.alt || product.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
