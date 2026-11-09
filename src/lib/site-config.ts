/**
 * The shape of `src/config/site.ts` — the ONE place every brand string and
 * hard fact lives. The Studio writes that file from the customer's intake;
 * nothing in it is invented by a model. Kit components read it; custom
 * sections must read it too rather than restating facts.
 */
export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  domain: string;
  locale: string;
  language: string;
  contact: {
    phoneE164: string | null;
    phoneDisplay: string | null;
    whatsappNumber: string | null;
    whatsappMessage: string;
    email: string | null;
  };
  address: {
    line: string | null;
    locality: string | null;
    country: string | null;
  };
  hours: { summary: string | null };
  nav: NavItem[];
  legalNav: NavItem[];
  socials: { label: string; href: string }[];
}

export interface Cta {
  label: string;
  href: string;
}

export function derive(config: SiteConfig) {
  const tel = config.contact.phoneE164 ? `tel:${config.contact.phoneE164}` : null;
  const whatsapp = config.contact.whatsappNumber
    ? `https://wa.me/${config.contact.whatsappNumber}?text=${encodeURIComponent(config.contact.whatsappMessage)}`
    : null;
  const mailto = config.contact.email ? `mailto:${config.contact.email}` : null;
  const fullAddress = [config.address.line, config.address.locality, config.address.country]
    .filter(Boolean)
    .join(', ');
  const mapsEmbed = fullAddress
    ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
    : null;
  return { tel, whatsapp, mailto, fullAddress: fullAddress || null, mapsEmbed };
}
