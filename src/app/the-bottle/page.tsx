import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "The Bottle",
  description: "One bottle across the whole house: the gold SAMPÉA wordmark and the lotus, a gold cap and a heavy glass base. Every bottle holds 30 ml.",
  path: "/the-bottle",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"The Bottle","path":"/the-bottle"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">The bottle</h1>
        </div>
      </section>
      <Story {...({
        "variant": "split",
        "eyebrow": "The front",
        "headline": "Wordmark in gold, and the lotus",
        "paragraphs": [
          "On the face of every bottle: the SAMPÉA wordmark in gold, and the lotus. A gold cap closes it.",
          "The face is the same on every bottle in the house."
        ],
        "image": {
          "alt": "Front of the Sampéa bottle with the gold wordmark and the lotus",
          "brief": "Supplied file site_v2_wordmark: the front of the bottle, square to camera, the gold SAMPÉA wordmark and the lotus in sharp focus. Keep the cap in frame but not as the subject.",
          "aspect": "portrait",
          "src": "https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60/7f2be30fa1e6a6e40ead38014f10b72df35ba0c5e8ffe57c951d3028c7276873.jpg"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <Story {...({
        "variant": "split",
        "eyebrow": "The base",
        "headline": "A heavy glass base",
        "paragraphs": [
          "The bottle stands on a heavy glass base. Lift it and you notice the weight first.",
          "Inside: 30 ml of perfume oil."
        ],
        "image": {
          "alt": "The heavy glass base of the Sampéa bottle seen from a low angle",
          "brief": "Supplied file site_v2_base: the heavy glass base seen from a low angle, light passing through the glass. Plum or cream ground.",
          "aspect": "square",
          "src": "https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60/1ac7a91b91bb235d7d1a4901c14d7884d7f55285cf57327e229b051eec2e6d37.jpg",
          "focus": "bottom"
        },
        "imageSide": "left"
      } satisfies StoryProps)} />
      <Story {...({
        "variant": "stacked",
        "eyebrow": "One bottle",
        "headline": "Every scent, the same bottle",
        "paragraphs": [
          "Sampéa uses one bottle across the whole house. Every one holds 30 ml, and every scent inside is 40% perfume oil.",
          "The bottle tells you it's Sampéa. The name tells you which scent."
        ],
        "imageSide": "left",
        "facts": [
          {
            "label": "Volume",
            "value": "30 ml"
          },
          {
            "label": "Perfume oil",
            "value": "40%"
          },
          {
            "label": "Bottle designs",
            "value": "One, for every scent"
          }
        ]
      } satisfies StoryProps)} />
      <CtaBand {...({
        "headline": "See the scents of the house",
        "body": "Each scent has its own page, all in this bottle.",
        "primaryCta": {
          "label": "See the shop",
          "href": "/shop"
        },
        "secondaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
