import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';
import { CategoryNav, ProductGrid } from '@/components/store';

export const metadata = pageMetadata({
  title: "Shop",
  description: "The scents of Sampéa, each in the same 30 ml bottle at 40% perfume oil. Open a scent's own page to add your name to its list.",
  path: "/shop",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Shop","path":"/shop"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Shop</h1>
        </div>
      </section>
      <Story {...({
        "variant": "stacked",
        "headline": "The scents of the house",
        "paragraphs": [
          "Each scent has its own page. All of them come in the same 30 ml bottle, and each is 40% perfume oil. On a scent's page you can add your name to its list."
        ],
        "imageSide": "left"
      } satisfies StoryProps)} />
      <CategoryNav />
      <ProductGrid />
      <CtaBand {...({
        "headline": "A question before you choose?",
        "body": "Write to the house about a scent, the bottle or Le Cercle Sampéa.",
        "primaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        },
        "secondaryCta": {
          "label": "See the bottle",
          "href": "/the-bottle"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
