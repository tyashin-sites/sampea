import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms for using the Sampéa website and shop, including the launch list, product information before launch, and how to contact us.",
  path: "/terms",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Terms","path":"/terms"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Legal",
        "headline": "Terms of use",
        "intro": "These terms apply when you use the Sampéa website and shop. By using the site, you agree to them.",
        "blocks": [
          {
            "heading": "Before launch",
            "paragraphs": [
              "Sampéa has not launched. Products shown on this site can't be bought yet, and scent names, notes, prices and the launch date aren't public. Joining the launch list doesn't reserve a product or commit you to buying one."
            ]
          },
          {
            "heading": "Orders",
            "paragraphs": [
              "When sales open, prices and order terms will be shown in the shop and at checkout before you pay."
            ]
          },
          {
            "heading": "Our content",
            "paragraphs": [
              "The text, images, the SAMPÉA wordmark and the lotus on this site belong to Sampéa. Please don't copy or reuse them without our permission."
            ]
          },
          {
            "heading": "Changes",
            "paragraphs": [
              "We may update these terms. The current version is always the one on this page."
            ]
          },
          {
            "heading": "Contact",
            "paragraphs": [
              "Questions about these terms can be sent to contact@houseofsampea.com."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
    </>
  );
}
