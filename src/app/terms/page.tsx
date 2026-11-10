import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the Sampéa website or place an order with Sampéa, the perfume oil house serving Canada and the US.",
  path: "/terms",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Terms","path":"/terms"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "headline": "",
        "intro": "These terms apply to your use of the Sampéa website and to orders placed through it. By using the site, you agree to them.",
        "blocks": [
          {
            "heading": "The website",
            "paragraphs": [
              "The content on this site, including the SAMPÉA wordmark, the lotus, the text and the photographs, belongs to Sampéa. Please don't copy or reuse it without written permission."
            ]
          },
          {
            "heading": "Products and orders",
            "paragraphs": [
              "Product details, availability and prices are shown on each product page and at checkout. An order is accepted when we confirm it. If we can't fulfil an order, we'll tell you and refund any payment taken.",
              "Sampéa sells to customers in Canada and the US."
            ]
          },
          {
            "heading": "Questions about an order",
            "paragraphs": [
              "For anything about an order, including returns, write to contact@houseofsampea.com."
            ]
          },
          {
            "heading": "Liability",
            "paragraphs": [
              "The site is provided as it is. To the extent the law allows, Sampéa isn't liable for indirect losses arising from your use of the site."
            ]
          },
          {
            "heading": "Changes",
            "paragraphs": [
              "We may update these terms. The version on this page is the one that applies."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
    </>
  );
}
