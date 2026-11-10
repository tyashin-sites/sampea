import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';
import { CategoryNav, ProductGrid } from '@/components/store';

export const metadata = pageMetadata({
  title: "Shop",
  description: "Sampéa's first bottle: 30 ml, 40% perfume oil. Prices aren't public yet, so the product page has a launch list where the price will be.",
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
        "eyebrow": "Not yet launched",
        "headline": "One bottle so far",
        "paragraphs": [
          "Sampéa hasn't launched, so there's no price yet. Open the product page and join the launch list in its place."
        ],
        "imageSide": "right"
      } satisfies StoryProps)} />
      <CategoryNav />
      <ProductGrid />
      <CtaBand {...({
        "eyebrow": "Before launch",
        "headline": "Something we haven't answered?",
        "body": "The FAQ covers what we can say today. For anything else, write to us.",
        "primaryCta": {
          "label": "Read the FAQ",
          "href": "/faq"
        },
        "secondaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
