import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "The Bottle",
  description: "The gold SAMPÉA wordmark and lotus, rectangular clear glass on a heavy base, a spray pump and a gold cap. 30 ml in every bottle.",
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
        "eyebrow": "The glass",
        "headline": "Rectangular, clear, on a heavy base",
        "paragraphs": [
          "The bottle is a rectangle of clear glass that stands on a heavy base. You'll feel the weight when you lift it."
        ],
        "image": {
          "alt": "The heavy glass base of the Sampéa bottle, shot low and close",
          "brief": "Customer's own photo of the bottle's base, shot low and close on a cream ground, showing the thickness of the clear glass. Soft side light, no props, no people.",
          "aspect": "portrait",
          "src": "https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60/1ac7a91b91bb235d7d1a4901c14d7884d7f55285cf57327e229b051eec2e6d37.jpg",
          "focus": "bottom"
        },
        "imageSide": "right",
        "facts": [
          {
            "label": "Glass",
            "value": "Clear, rectangular"
          },
          {
            "label": "Base",
            "value": "Heavy"
          }
        ]
      } satisfies StoryProps)} />
      <Story {...({
        "variant": "split",
        "eyebrow": "The mark",
        "headline": "SAMPÉA in gold, with a lotus",
        "paragraphs": [
          "The glass carries the SAMPÉA wordmark in gold, with a lotus.",
          "Inside, every bottle holds 30 ml, and every scent is 40% perfume oil."
        ],
        "image": {
          "alt": "The gold SAMPÉA wordmark and lotus on the clear glass bottle, with the gold cap",
          "brief": "Customer's own detail photo of the gold SAMPÉA wordmark and lotus on the clear glass, sharp focus on the gold, cream ground behind. No props.",
          "aspect": "landscape",
          "src": "https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60/7f2be30fa1e6a6e40ead38014f10b72df35ba0c5e8ffe57c951d3028c7276873.jpg"
        },
        "imageSide": "right",
        "facts": [
          {
            "label": "Volume",
            "value": "30 ml"
          },
          {
            "label": "Perfume oil",
            "value": "40%"
          }
        ]
      } satisfies StoryProps)} />
      <CtaBand {...({
        "eyebrow": "In the shop",
        "headline": "The bottle is waiting in the shop",
        "body": "Join the launch list on its product page. That's where the price will go when we open.",
        "primaryCta": {
          "label": "Join the launch list",
          "href": "/shop"
        },
        "secondaryCta": {
          "label": "Read the FAQ",
          "href": "/faq"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
