import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the Sampéa website. Nothing is for sale on this site yet; it shares information about a perfume house before launch.",
  path: "/terms",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Terms","path":"/terms"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Legal",
        "headline": "Terms of Use",
        "intro": "These terms apply when you use the Sampéa website. By using the site, you agree to them.",
        "blocks": [
          {
            "heading": "About this site",
            "paragraphs": [
              "This website shares information about Sampéa, a perfume house that has not launched yet. Nothing is offered for sale here, and nothing on this site is an offer to sell."
            ]
          },
          {
            "heading": "Information may change",
            "paragraphs": [
              "We try to keep the information on this site accurate, but details may change before and after launch. We may update or remove content at any time without notice."
            ]
          },
          {
            "heading": "Our content",
            "paragraphs": [
              "The Sampéa name, text, design and other content on this site belong to Sampéa. Please do not copy or reuse them without our written permission."
            ]
          },
          {
            "heading": "Using the site",
            "paragraphs": [
              "Please use this site lawfully. Do not try to disrupt it, gain unauthorised access to it, or use it to send unsolicited messages."
            ]
          },
          {
            "heading": "Liability",
            "paragraphs": [
              "The site is provided as it is. To the extent the law allows, Sampéa is not liable for any loss arising from your use of the site or from relying on its content."
            ]
          },
          {
            "heading": "Changes to these terms",
            "paragraphs": [
              "We may update these terms from time to time. The current version is always the one on this page."
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
