import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "About",
  description: "Sampéa is a perfume house built on access, for people in Canada and the US who want a scent few others wear. Meet Le Cercle Sampéa.",
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
        "headline": "Built on access",
        "paragraphs": [
          "Sampéa makes perfume oil for people in Canada and the US who want a scent that few others wear.",
          "Every bottle holds 30 ml. Every scent is 40% perfume oil. One bottle, with the gold SAMPÉA wordmark and the lotus, serves the whole house."
        ],
        "imageSide": "left"
      } satisfies StoryProps)} />
      <Story {...({
        "variant": "stacked",
        "eyebrow": "The circle",
        "headline": "Le Cercle Sampéa",
        "paragraphs": [
          "Le Cercle Sampéa is the circle of people who wear Sampéa. Wearing it is how you belong."
        ],
        "imageSide": "left"
      } satisfies StoryProps)} />
      <CtaBand {...({
        "headline": "Write to the house",
        "body": "Tell us what you'd like to know. We read every message.",
        "primaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        },
        "secondaryCta": {
          "label": "See the shop",
          "href": "/shop"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
