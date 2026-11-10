import { siteConfig, FULL_ADDRESS } from '@/config/site';
import { SITE_URL } from '@/lib/seo';

/** Sitewide entity nodes (addendum §3b). Only facts from siteConfig — nothing invented. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationLd(kind: 'Organization' | 'LocalBusiness' | 'Store' = 'Organization') {
  const node: Record<string, unknown> = {
    '@type': kind,
    '@id': ORG_ID,
    name: siteConfig.name,
    url: SITE_URL,
    image: `${SITE_URL}/og/default.png`,
    description: siteConfig.description,
  };
  if (siteConfig.tagline) node.slogan = siteConfig.tagline;
  if (siteConfig.contact.phoneE164) node.telephone = siteConfig.contact.phoneE164;
  if (siteConfig.contact.email) node.email = siteConfig.contact.email;
  if (FULL_ADDRESS) {
    node.address = {
      '@type': 'PostalAddress',
      ...(siteConfig.address.line ? { streetAddress: siteConfig.address.line } : {}),
      ...(siteConfig.address.locality ? { addressLocality: siteConfig.address.locality } : {}),
      ...(siteConfig.address.country ? { addressCountry: siteConfig.address.country } : {}),
    };
  }
  if (siteConfig.socials.length) node.sameAs = siteConfig.socials.map((s) => s.href);
  return node;
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === '/' ? '' : it.path}`,
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/**
 * Product node. The Offer (price) is added ONLY when the store can sell and the
 * product has a price: a pre-launch product never advertises one.
 */
export function productLd(p: {
  name: string;
  description: string;
  path: string;
  images: string[];
  sku?: string;
  offer?: { price: string; currency: string; inStock: boolean };
}) {
  const url = `${SITE_URL}${p.path}`;
  const node: Record<string, unknown> = {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: p.name,
    url,
    description: p.description,
    brand: { '@type': 'Brand', name: siteConfig.name },
  };
  if (p.images.length) node.image = p.images;
  if (p.sku) node.sku = p.sku;
  if (p.offer) {
    node.offers = {
      '@type': 'Offer',
      url,
      price: p.offer.price,
      priceCurrency: p.offer.currency,
      availability: p.offer.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@id': ORG_ID },
    };
  }
  return node;
}
