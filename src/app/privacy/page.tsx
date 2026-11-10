import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sampéa handles the personal details you share on this site, including your email address when you join the launch list or write to us.",
  path: "/privacy",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Privacy","path":"/privacy"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Legal",
        "headline": "Privacy policy",
        "intro": "This policy explains how Sampéa uses the personal details you give us through this website.",
        "blocks": [
          {
            "heading": "What we collect",
            "paragraphs": [
              "We collect only what you choose to give us: your email address when you join the launch list, what you include when you write to contact@houseofsampea.com, and the details needed to complete an order once we start selling."
            ]
          },
          {
            "heading": "How we use it",
            "paragraphs": [
              "We use your email address to tell you about Sampéa's launch and to reply when you write to us. We use order details to process, deliver and support your order. We don't sell your personal details."
            ]
          },
          {
            "heading": "Who else handles it",
            "paragraphs": [
              "This website and shop run on the Tyashin platform, which stores this information on our behalf. Payment details at checkout are handled by the payment provider, not kept by us."
            ]
          },
          {
            "heading": "Your choices",
            "paragraphs": [
              "You can ask to see, correct or delete the details we hold about you, or leave the launch list, by writing to contact@houseofsampea.com."
            ]
          },
          {
            "heading": "Changes to this policy",
            "paragraphs": [
              "If we change this policy, the updated version will appear on this page."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
    </>
  );
}
