import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd } from '@/components/kit';
import { CategoryNav, ProductGrid } from '@/components/store';
import { breadcrumbLd, organizationLd, websiteLd } from '@/lib/schema';
import { fetchCategories } from '@/lib/commerce';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ category: string }> };

async function findCategory(slug: string) {
  const all = await fetchCategories();
  if (all === null) throw new Error('The store could not be reached.');
  return all.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = await findCategory(category);
  if (!c) return {};
  return pageMetadata({
    title: c.name,
    description: (c.description || `${c.name} from ${siteConfig.name}.`).slice(0, 155),
    path: `/shop/${c.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  const c = await findCategory(category);
  if (!c) notFound();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: c.name, path: `/shop/${c.slug}` },
  ];
  return (
    <>
      <JsonLd nodes={[organizationLd('Store'), websiteLd(), breadcrumbLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display">{c.name}</h1>
          {c.description ? <p className="lead mt-4">{c.description}</p> : null}
        </div>
      </section>
      <CategoryNav active={c.slug} />
      <ProductGrid category={c.slug} />
    </>
  );
}
