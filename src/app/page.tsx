import { pageMetadata } from '@/lib/seo';
import { CtaBand, Hero, JsonLd, Stats, Story } from '@/components/kit';
import type { CtaBandProps, HeroProps, StatsProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Sampéa | A perfume house, not yet launched",
  description: "Sampéa is a perfume house that has not launched yet. Every bottle is 30 ml and every scent is 40% perfume oil. Join the launch list in our shop.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd()]} />
      <Hero {...({
        "variant": "editorial",
        "eyebrow": "Sampéa · Not yet launched",
        "headline": "Every bottle 30 ml. Every scent 40% perfume oil.",
        "sub": "Sampéa is a perfume house that hasn't launched yet. Our first bottle is in the shop, with a launch list where the price will be.",
        "primaryCta": {
          "label": "Join the launch list",
          "href": "/shop"
        },
        "secondaryCta": {
          "label": "See the bottle",
          "href": "/the-bottle"
        },
        "image": {
          "alt": "The Sampéa bottle in clear glass with a polished gold crown cap, on a cream ground",
          "brief": "Customer's own photo of the Sampéa bottle, straight on, on a plain cream ground in soft daylight. Show the whole rectangular clear glass, the heavy base, the gold crown cap and the gold SAMPÉA wordmark with the lotus. No props, no people, no scent colour styling.",
          "aspect": "portrait",
          "src": "https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60/de9c052e5fe49daf61a71522b3b3761958b5d7931cd249c0511198f7304fa76d.jpg",
          "focus": "right"
        },
        "facts": [
          "30 ml bottle",
          "40% perfume oil",
          "Launching in Canada and the US"
        ]
      } satisfies HeroProps)} />
      <Stats {...({
        "eyebrow": "In every bottle",
        "headline": "Two things are already settled",
        "items": [
          {
            "value": "30 ml",
            "label": "In every bottle"
          },
          {
            "value": "40%",
            "label": "Perfume oil in every scent"
          }
        ],
        "dark": true
      } satisfies StatsProps)} />
      <Story {...({
        "variant": "stacked",
        "eyebrow": "The bottle",
        "headline": "Clear glass, a heavy base, a gold crown",
        "paragraphs": [
          "Each bottle is rectangular clear glass on a heavy base, with a spray pump and a polished gold crown cap. It carries the SAMPÉA wordmark in gold, with a lotus."
        ],
        "imageSide": "right"
      } satisfies StoryProps)} />
      <CtaBand {...({
        "eyebrow": "Not yet launched",
        "headline": "Be among the first to hear",
        "body": "Scent names, prices and the launch date aren't public yet. The launch list sits on the product page, where the price will be.",
        "primaryCta": {
          "label": "Join the launch list",
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
