import Link from 'next/link';
import { getCategories } from '@/lib/commerce';

/** Category links for the shop. Renders nothing when the store has one or no categories. */
export async function CategoryNav({ active }: { active?: string }) {
  const categories = await getCategories();
  if (categories.length < 2) return null;
  const chip = 'rounded-full border px-4 py-1.5 text-sm transition-colors';
  return (
    <nav aria-label="Categories" className="container-x pt-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/shop"
            aria-current={!active ? 'page' : undefined}
            className={`${chip} ${!active ? 'bg-primary text-primary-contrast border-primary' : 'border-border hover:border-foreground'}`}
          >
            All
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/shop/${c.slug}`}
              aria-current={active === c.slug ? 'page' : undefined}
              className={`${chip} ${active === c.slug ? 'bg-primary text-primary-contrast border-primary' : 'border-border hover:border-foreground'}`}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
