import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Faq, JsonLd } from '@/components/kit';
import type { CtaBandProps, FaqProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, faqLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers about Sampéa before launch: bottle size, perfume oil, where we're launching, and why there are no prices or scent names on the site yet.",
  path: "/faq",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"FAQ","path":"/faq"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), faqLd([{"q":"Has Sampéa launched?","a":"Not yet. Sampéa is a perfume house that hasn't launched, and no launch date has been announced."},{"q":"Where will Sampéa launch?","a":"In Canada and the US."},{"q":"How big is a bottle?","a":"Every bottle is 30 ml."},{"q":"How much perfume oil is in each scent?","a":"Every scent is 40% perfume oil."},{"q":"What are the scents, and what will they cost?","a":"Scent names, notes and prices aren't public yet. Join the launch list on the product page to hear when they are."},{"q":"How do I join the launch list?","a":"Open the bottle's product page in the shop. The launch list sits where the price will be."},{"q":"What does the bottle look like?","a":"Rectangular clear glass with a heavy base, a spray pump, a polished gold crown cap and the gold SAMPÉA wordmark with a lotus."},{"q":"How can I reach you?","a":"Write to contact@houseofsampea.com."}]), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Questions</h1>
        </div>
      </section>
      <Faq {...({
        "eyebrow": "Before launch",
        "headline": "What we can tell you today",
        "items": [
          {
            "q": "Has Sampéa launched?",
            "a": "Not yet. Sampéa is a perfume house that hasn't launched, and no launch date has been announced."
          },
          {
            "q": "Where will Sampéa launch?",
            "a": "In Canada and the US."
          },
          {
            "q": "How big is a bottle?",
            "a": "Every bottle is 30 ml."
          },
          {
            "q": "How much perfume oil is in each scent?",
            "a": "Every scent is 40% perfume oil."
          },
          {
            "q": "What are the scents, and what will they cost?",
            "a": "Scent names, notes and prices aren't public yet. Join the launch list on the product page to hear when they are."
          },
          {
            "q": "How do I join the launch list?",
            "a": "Open the bottle's product page in the shop. The launch list sits where the price will be."
          },
          {
            "q": "What does the bottle look like?",
            "a": "Rectangular clear glass with a heavy base, a spray pump, a polished gold crown cap and the gold SAMPÉA wordmark with a lotus."
          },
          {
            "q": "How can I reach you?",
            "a": "Write to contact@houseofsampea.com."
          }
        ]
      } satisfies FaqProps)} />
      <CtaBand {...({
        "eyebrow": "Not yet launched",
        "headline": "Join the launch list",
        "body": "It's on the product page in our shop.",
        "primaryCta": {
          "label": "Go to the shop",
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
