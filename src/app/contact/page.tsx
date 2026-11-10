import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, Contact, CtaBand, JsonLd } from '@/components/kit';
import type { ContactProps, CtaBandProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Contact",
  description: "Write to Sampéa at contact@houseofsampea.com with questions about the bottle, the scents or Le Cercle Sampéa. Email reaches the house.",
  path: "/contact",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Contact","path":"/contact"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Contact {...({
        "headline": "Write to the house",
        "body": "Email is the way to reach Sampéa. Ask about the bottle, the scents or Le Cercle Sampéa.",
        "headingLevel": "h1"
      } satisfies ContactProps)} />
      <CtaBand {...({
        "headline": "See the scents first",
        "body": "Each scent has its own page, all in the same 30 ml bottle.",
        "primaryCta": {
          "label": "See the shop",
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
