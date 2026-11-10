import Link from 'next/link';
import { getCategories, getRecentPosts } from '@/lib/commerce';

/** Footer columns a store adds: its live categories and, once there are any, recent posts. */
export async function StoreFooterLinks({ blog }: { blog: boolean }) {
  const [categories, posts] = await Promise.all([
    getCategories(),
    blog ? getRecentPosts(3) : Promise.resolve([]),
  ]);
  const cols: { heading: string; links: { label: string; href: string }[] }[] = [];
  if (categories.length) {
    cols.push({
      heading: 'Shop',
      links: [
        { label: 'All products', href: '/shop' },
        ...categories.slice(0, 6).map((c) => ({ label: c.name, href: `/shop/${c.slug}` })),
      ],
    });
  }
  if (posts.length) {
    cols.push({
      heading: 'From the journal',
      links: posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
    });
  }
  return (
    <>
      {cols.map((col) => (
        <div key={col.heading} className="lg:col-span-2">
          <h2 className="eyebrow">{col.heading}</h2>
          <ul className="space-y-2.5 text-[15px]">
            {col.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-paper/80 hover:text-paper underline-offset-4 hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
