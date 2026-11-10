import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Faq, JsonLd } from '@/components/kit';
import type { CtaBandProps, FaqProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, faqLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers about Sampéa: the 30 ml bottle, the 40% perfume oil in every scent, where the house is available and how to reach us.",
  path: "/faq",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"FAQ","path":"/faq"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), faqLd([{"q":"How much does a bottle hold?","a":"Every Sampéa bottle holds 30 ml."},{"q":"What concentration is each scent?","a":"Every scent is 40% perfume oil."},{"q":"Why do all the bottles look the same?","a":"Sampéa uses one bottle across the whole house: the gold SAMPÉA wordmark and the lotus, with a gold cap. The scents are told apart by name, not by bottle."},{"q":"Where is Sampéa available?","a":"Canada and the US."},{"q":"What is Le Cercle Sampéa?","a":"The circle of people who wear Sampéa."},{"q":"When can I order?","a":"Join a scent's list in the shop to hear from the house first, or write to contact@houseofsampea.com."},{"q":"How do I reach Sampéa?","a":"By email, at contact@houseofsampea.com."}]), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Questions</h1>
        </div>
      </section>
      <Faq {...({
        "items": [
          {
            "q": "How much does a bottle hold?",
            "a": "Every Sampéa bottle holds 30 ml."
          },
          {
            "q": "What concentration is each scent?",
            "a": "Every scent is 40% perfume oil."
          },
          {
            "q": "Why do all the bottles look the same?",
            "a": "Sampéa uses one bottle across the whole house: the gold SAMPÉA wordmark and the lotus, with a gold cap. The scents are told apart by name, not by bottle."
          },
          {
            "q": "Where is Sampéa available?",
            "a": "Canada and the US."
          },
          {
            "q": "What is Le Cercle Sampéa?",
            "a": "The circle of people who wear Sampéa."
          },
          {
            "q": "When can I order?",
            "a": "Join a scent's list in the shop to hear from the house first, or write to contact@houseofsampea.com."
          },
          {
            "q": "How do I reach Sampéa?",
            "a": "By email, at contact@houseofsampea.com."
          }
        ]
      } satisfies FaqProps)} />
      <CtaBand {...({
        "headline": "Something we didn't answer?",
        "body": "Write to the house and ask.",
        "primaryCta": {
          "label": "Write to us",
          "href": "mailto:contact@houseofsampea.com"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
