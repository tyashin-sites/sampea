/**
 * siteConfig — EVERY brand string and hard fact lives here. Written by Tyashin
 * Website Studio from the customer's intake; nothing below was invented by a
 * model. Missing facts are null on purpose (see docs/ASSET-DEBT.md).
 */
import { derive, type SiteConfig, type Cta } from '@/lib/site-config';

export const siteConfig: SiteConfig = {
  "name": "Sampéa",
  "shortName": "Sampéa",
  "tagline": "",
  "description": "Sampéa is a perfume house that has not launched yet. Every bottle is 30 ml and every scent is 40% perfume oil. Launching in India, Canada and the US.",
  "domain": "sampea.sites.tyashin.com",
  "locale": "en_US",
  "language": "en",
  "contact": {
    "phoneE164": null,
    "phoneDisplay": null,
    "whatsappNumber": null,
    "whatsappMessage": "Hi Sampéa, I would like to enquire.",
    "email": "contact@houseofsampea.com"
  },
  "address": {
    "line": null,
    "locality": null,
    "country": null
  },
  "hours": {
    "summary": null
  },
  "nav": [
    {
      "label": "Shop",
      "href": "/shop"
    },
    {
      "label": "The Bottle",
      "href": "/the-bottle"
    },
    {
      "label": "About",
      "href": "/about"
    },
    {
      "label": "FAQ",
      "href": "/faq"
    },
    {
      "label": "Contact",
      "href": "/contact"
    }
  ],
  "legalNav": [
    {
      "label": "Privacy",
      "href": "/privacy"
    },
    {
      "label": "Terms",
      "href": "/terms"
    }
  ],
  "socials": [],
  "commerce": {
    "enabled": true,
    "blog": true
  }
};

const d = derive(siteConfig);
export const TEL_URL = d.tel;
export const WHATSAPP_URL = d.whatsapp;
export const MAILTO_URL = d.mailto;
export const FULL_ADDRESS = d.fullAddress;
export const MAPS_EMBED_URL = d.mapsEmbed;

/** Where the contact form posts leads; TYASHIN_API_URL overrides it when set. */
export const TYASHIN_API_ORIGIN = "https://website-api.tyashin.com";

/** The Tyashin project whose brand kit (logo, colours) this site shows at runtime. */
export const TYASHIN_PROJECT_ID = "6af1ee7a2976dd881e839d60";

/** The one primary action, used by the header, footer and mobile menu. */
export const PRIMARY_CTA: Cta | null = WHATSAPP_URL
  ? { label: 'WhatsApp us', href: WHATSAPP_URL }
  : TEL_URL
    ? { label: 'Call us', href: TEL_URL }
    : { label: 'Contact us', href: '/contact' };
