import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, Contact, CtaBand, JsonLd } from '@/components/kit';
import type { ContactProps, CtaBandProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Contact",
  description: "Write to Sampéa at contact@houseofsampea.com with questions about the house, press enquiries or anything else. Sampéa has not launched yet.",
  path: "/contact",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Contact","path":"/contact"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Contact {...({
        "eyebrow": "Correspondence",
        "headline": "Write to us",
        "body": "Sampéa has not launched yet, so email is the one way to reach the house. Send questions, press enquiries or a simple hello to contact@houseofsampea.com.",
        "headingLevel": "h1"
      } satisfies ContactProps)} />
      <CtaBand {...({
        "headline": "One address for everything",
        "body": "contact@houseofsampea.com",
        "primaryCta": {
          "label": "Email Sampéa",
          "href": "mailto:contact@houseofsampea.com"
        },
        "secondaryCta": {
          "label": "About the house",
          "href": "/about"
        },
        "note": "No waitlist or newsletter yet."
      } satisfies CtaBandProps)} />
    </>
  );
}
