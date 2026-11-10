import { pageMetadata } from '@/lib/seo';
import { CtaBand, Hero, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, HeroProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Sampéa | A perfume house",
  description: "Sampéa makes perfume oil for Canada and the US. Every bottle holds 30 ml and every scent is 40% perfume oil. One bottle for the whole house.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd()]} />
      <Hero {...({
        "variant": "immersive",
        "eyebrow": "Not yet launched · Canada and the US",
        "headline": "Perfume oil few others wear.",
        "sub": "One bottle for the whole house, with each scent known by its name.",
        "primaryCta": {
          "label": "See the shop",
          "href": "/shop"
        },
        "secondaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        },
        "image": {
          "alt": "The Sampéa bottle at a three-quarter angle, its gold wordmark and lotus catching the light",
          "brief": "Supplied file site_v1_hero: the bottle at a three-quarter angle, sitting in the right of the frame, with open space on the left for the headline. Warm, low light on a cream or plum ground. No close-up of the cap.",
          "aspect": "wide",
          "src": "https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60/de9c052e5fe49daf61a71522b3b3761958b5d7931cd249c0511198f7304fa76d.jpg",
          "focus": "right"
        },
        "facts": [
          "30 ml, every bottle",
          "40% perfume oil, every scent"
        ]
      } satisfies HeroProps)} />
      <Story {...({
        "variant": "split",
        "eyebrow": "The bottle",
        "headline": "The gold wordmark and the lotus",
        "paragraphs": [
          "Every Sampéa bottle carries the gold SAMPÉA wordmark and the lotus on its face. A gold cap closes it, and it stands on a heavy glass base.",
          "The bottle is the same for every scent in the house. You choose a scent by its name."
        ],
        "image": {
          "alt": "Front of the Sampéa bottle showing the gold wordmark and the lotus",
          "brief": "Supplied file site_v2_wordmark: the front of the bottle, square to camera, the gold SAMPÉA wordmark and the lotus in sharp focus. Soft daylight on a limestone-toned ground.",
          "aspect": "portrait",
          "src": "https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60/7f2be30fa1e6a6e40ead38014f10b72df35ba0c5e8ffe57c951d3028c7276873.jpg"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <Story {...({
        "variant": "stacked",
        "eyebrow": "Le Cercle Sampéa",
        "headline": "A house built on access",
        "paragraphs": [
          "Sampéa is for people in Canada and the US who want a perfume that few others wear. Le Cercle Sampéa is the circle of people who wear it."
        ],
        "imageSide": "left"
      } satisfies StoryProps)} />
      <CtaBand {...({
        "headline": "Write to the house",
        "body": "A question about the bottle, the scents or Le Cercle Sampéa? Email reaches us directly.",
        "primaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        },
        "secondaryCta": {
          "label": "See the shop",
          "href": "/shop"
        },
        "note": "contact@houseofsampea.com"
      } satisfies CtaBandProps)} />
    </>
  );
}
