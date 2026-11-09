import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Faq, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FaqProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, faqLd } from '@/lib/schema';
import { BOTTLE_PROFILE } from '@/config/media';

export const metadata = pageMetadata({
  title: "About Sampéa | A perfume house in the making",
  description: "Sampéa is a perfume house preparing to launch in India, Canada and the US. One bottle size, 30 ml, and 40% perfume oil in every scent.",
  path: "/about",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"About","path":"/about"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), faqLd([{"q":"Has Sampéa launched?","a":"Not yet. Nothing is for sale, and there is no shop on this site."},{"q":"When will Sampéa launch?","a":"We haven't announced a date. If you'd like to ask, write to contact@houseofsampea.com."},{"q":"What are the scents called?","a":"Scent names and notes are not public yet. We'll share them at launch."},{"q":"How big is a bottle?","a":"Every Sampéa bottle is 30 ml."},{"q":"How strong are the scents?","a":"Every Sampéa scent is 40% perfume oil."},{"q":"Where will Sampéa be available?","a":"Sampéa is launching in India, Canada and the US."}]), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">About Sampéa</h1>
        </div>
      </section>
      <Story {...({
        "variant": "stacked",
        "eyebrow": "The house",
        "headline": "Two fixed numbers, then the scents",
        "paragraphs": [
          "Sampéa is a perfume house. It has not launched yet.",
          "Every bottle is 30 ml. Every scent is 40% perfume oil. Those two things will not change from one scent to the next.",
          "Sampéa will launch in India, Canada and the US. Until then, the scents stay private and the door stays open by email."
        ],
        "image": {
          "src": BOTTLE_PROFILE,
          "alt": "The Sampéa bottle seen from the side.",
          "brief": "",
          "aspect": "wide"
        },
        "facts": [
          {
            "label": "Bottle size",
            "value": "30 ml"
          },
          {
            "label": "Perfume oil",
            "value": "40%"
          },
          {
            "label": "Launching in",
            "value": "India, Canada, US"
          }
        ]
      } satisfies StoryProps)} />
      <Faq {...({
        "eyebrow": "Questions",
        "headline": "What we can tell you now",
        "items": [
          {
            "q": "Has Sampéa launched?",
            "a": "Not yet. Nothing is for sale, and there is no shop on this site."
          },
          {
            "q": "When will Sampéa launch?",
            "a": "We haven't announced a date. If you'd like to ask, write to contact@houseofsampea.com."
          },
          {
            "q": "What are the scents called?",
            "a": "Scent names and notes are not public yet. We'll share them at launch."
          },
          {
            "q": "How big is a bottle?",
            "a": "Every Sampéa bottle is 30 ml."
          },
          {
            "q": "How strong are the scents?",
            "a": "Every Sampéa scent is 40% perfume oil."
          },
          {
            "q": "Where will Sampéa be available?",
            "a": "Sampéa is launching in India, Canada and the US."
          }
        ]
      } satisfies FaqProps)} />
      <CtaBand {...({
        "eyebrow": "Still curious",
        "headline": "Ask us anything by email",
        "body": "We answer questions about the house at contact@houseofsampea.com.",
        "primaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        },
        "secondaryCta": {
          "label": "Contact page",
          "href": "/contact"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
