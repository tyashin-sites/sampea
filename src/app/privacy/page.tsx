import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sampéa handles the personal information you share on this site, when you order, join a list or write to contact@houseofsampea.com.",
  path: "/privacy",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Privacy","path":"/privacy"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Store"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "headline": "",
        "intro": "This policy explains what personal information Sampéa collects through this website and how it's used. Questions go to contact@houseofsampea.com.",
        "blocks": [
          {
            "heading": "What we collect",
            "paragraphs": [
              "We collect the information you choose to give us: your email address when you join a scent's list or write to us, and the name, shipping address and contact details needed to complete an order.",
              "Payment details are processed at checkout to complete your order. The site may use essential cookies, for example to keep items in your cart."
            ]
          },
          {
            "heading": "How we use it",
            "paragraphs": [
              "We use your information only for the reason you gave it to us:"
            ],
            "bullets": [
              "To reply to your messages",
              "To tell you about a scent whose list you joined",
              "To process and deliver your orders",
              "To keep the site working and secure"
            ]
          },
          {
            "heading": "Sharing",
            "paragraphs": [
              "We don't sell your personal information. We share it only with the services that run this website, take payment and deliver orders, and only as much as they need."
            ]
          },
          {
            "heading": "Your choices",
            "paragraphs": [
              "You can ask to see, correct or delete the personal information we hold about you, or leave any list, by writing to contact@houseofsampea.com."
            ]
          },
          {
            "heading": "Changes",
            "paragraphs": [
              "If this policy changes, the updated version will be posted on this page."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
    </>
  );
}
