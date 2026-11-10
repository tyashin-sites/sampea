import { Star } from 'lucide-react';
import { getReviews } from '@/lib/commerce';

/** Customer reviews, only when the store shows reviews and has some. */
export async function Reviews({ productId }: { productId: string }) {
  const data = await getReviews(productId);
  if (!data) return null;
  const avg = Math.round(data.stats.averageRating * 10) / 10;
  return (
    <section className="section" aria-labelledby="reviews-heading">
      <div className="container-x max-w-3xl">
        <h2 id="reviews-heading" className="tt-2">
          Reviews
        </h2>
        <p className="text-muted mt-2">
          {avg} out of 5 from {data.stats.totalReviews}{' '}
          {data.stats.totalReviews === 1 ? 'review' : 'reviews'}
        </p>
        <ul className="mt-8 grid gap-8">
          {data.reviews.map((r, i) => (
            <li key={r._id ?? i} className="border-border border-t pt-6">
              <p className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Star
                    key={s}
                    aria-hidden
                    className={`h-4 w-4 ${s < r.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                  />
                ))}
              </p>
              {r.title ? <p className="mt-3 font-medium">{r.title}</p> : null}
              {r.body ? <p className="mt-2 leading-relaxed">{r.body}</p> : null}
              {r.authorName ? <p className="text-muted mt-2 text-sm">{r.authorName}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
