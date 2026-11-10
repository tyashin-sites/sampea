import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, Contact, CtaBand, JsonLd } from '@/components/kit';
import type { ContactProps, CtaBandProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Contact",
  description: "Write to Sampéa at contact@houseofsampea.com. We're a perfume house that hasn't launched yet, launching in Canada and the US.",
  path: "/contact",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Contact","path":"/contact"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Contact {...({
        "eyebrow": "Contact",
        "headline": "Write to Sampéa",
        "body": "Our address is contact@houseofsampea.com. To hear when we launch, join the list on the product page.",
        "headingLevel": "h1"
      } satisfies ContactProps)} />
      <CtaBand {...({
        "eyebrow": "Not yet launched",
        "headline": "Hear when we launch",
        "body": "The launch list is on the product page, where the price will be.",
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
