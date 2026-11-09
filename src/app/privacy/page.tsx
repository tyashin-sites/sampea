import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sampéa handles the personal information you share when you visit this website or write to us at contact@houseofsampea.com.",
  path: "/privacy",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Privacy","path":"/privacy"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Legal",
        "headline": "Privacy Policy",
        "intro": "This policy explains how Sampéa handles personal information connected with this website. Sampéa has not launched yet, and this site does not sell anything or offer accounts, sign-ups or newsletters.",
        "blocks": [
          {
            "heading": "What we collect",
            "paragraphs": [
              "If you email us at contact@houseofsampea.com, we receive your email address, your name if you include it, and whatever you write in your message.",
              "Like most websites, our hosting provider may record standard technical information such as your IP address, browser type and the pages you view, to keep the site running and secure."
            ]
          },
          {
            "heading": "How we use it",
            "paragraphs": [
              "We use what you send us to read and reply to your message. We use technical information only to operate and protect the website."
            ],
            "bullets": [
              "We do not sell your personal information.",
              "We do not share it with others for their marketing.",
              "We do not add you to any mailing list."
            ]
          },
          {
            "heading": "How long we keep it",
            "paragraphs": [
              "We keep emails for as long as we need them to deal with your message, and then delete them unless we have a legal reason to keep them."
            ]
          },
          {
            "heading": "Your choices",
            "paragraphs": [
              "You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Write to contact@houseofsampea.com and we will respond."
            ]
          },
          {
            "heading": "Changes to this policy",
            "paragraphs": [
              "We may update this policy, for example when Sampéa launches. The current version is always the one on this page."
            ]
          },
          {
            "heading": "Contact",
            "paragraphs": [
              "Questions about this policy can be sent to contact@houseofsampea.com."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
    </>
  );
}
