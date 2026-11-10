import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "About",
  description: "Sampéa is a perfume house launching in Canada and the US. Every bottle is 30 ml and every scent is 40% perfume oil. Not yet launched.",
  path: "/about",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"About","path":"/about"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">About Sampéa</h1>
        </div>
      </section>
      <Story {...({
        "variant": "stacked",
        "eyebrow": "The house",
        "headline": "A perfume house, not yet launched",
        "paragraphs": [
          "Sampéa is a perfume house. We haven't launched, and our scent names, notes, prices and launch date aren't public yet.",
          "Two things are settled. Every bottle holds 30 ml. Every scent is 40% perfume oil.",
          "Launching in Canada and the US."
        ],
        "imageSide": "right"
      } satisfies StoryProps)} />
      <CtaBand {...({
        "eyebrow": "Not yet launched",
        "headline": "Hear from us first",
        "body": "Join the launch list on the product page in our shop.",
        "primaryCta": {
          "label": "Join the launch list",
          "href": "/shop"
        },
        "secondaryCta": {
          "label": "See the bottle",
          "href": "/the-bottle"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
