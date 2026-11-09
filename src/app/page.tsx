import { pageMetadata } from '@/lib/seo';
import { CtaBand, Hero, JsonLd, Stats, Story } from '@/components/kit';
import type { CtaBandProps, HeroProps, StatsProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Sampéa | Perfume house, launching soon",
  description: "Sampéa is a perfume house that has not launched yet. Every bottle is 30 ml and every scent is 40% perfume oil. Write to us at contact@houseofsampea.com.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd()]} />
      <Hero {...({
        "variant": "centered",
        "eyebrow": "Perfume house · Not yet launched",
        "headline": "A perfume house, still in the making",
        "sub": "Sampéa has not launched yet. When it does, every bottle will be 30 ml and every scent will be 40% perfume oil.",
        "primaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        },
        "secondaryCta": {
          "label": "About the house",
          "href": "/about"
        },
        "image": {
          "alt": "",
          "brief": "",
          "aspect": "landscape"
        },
        "facts": [
          "30 ml, every bottle",
          "40% perfume oil, every scent",
          "Launching in India, Canada and the US"
        ]
      } satisfies HeroProps)} />
      <Stats {...({
        "eyebrow": "Two numbers",
        "headline": "Remember these",
        "items": [
          {
            "value": "30 ml",
            "label": "The size of every bottle"
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
        "eyebrow": "One size, one strength",
        "headline": "The only choice left is the scent",
        "paragraphs": [
          "Each Sampéa scent is 40% perfume oil. Each bottle holds 30 ml. Both numbers stay the same across the whole house.",
          "Names, notes and prices are not public yet. We'll share them when Sampéa launches."
        ],
        "image": {
          "alt": "",
          "brief": "",
          "aspect": "landscape"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <CtaBand {...({
        "eyebrow": "Before launch",
        "headline": "Write to Sampéa",
        "body": "Questions, press, or plain curiosity. There is one address for all of it.",
        "primaryCta": {
          "label": "Email contact@houseofsampea.com",
          "href": "mailto:contact@houseofsampea.com"
        },
        "secondaryCta": {
          "label": "Contact page",
          "href": "/contact"
        },
        "note": "There is no shop, waitlist or newsletter yet. Email is the way to reach us."
      } satisfies CtaBandProps)} />
    </>
  );
}
