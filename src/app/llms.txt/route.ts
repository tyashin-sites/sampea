import { siteConfig, FULL_ADDRESS } from '@/config/site';
import { SITE_URL } from '@/lib/seo';

/** /llms.txt — a plain, factual summary for AI answer engines. Facts only. */
export const dynamic = 'force-static';

const PAGES: { label: string; path: string; description: string }[] = [
  {
    "label": "Home",
    "path": "/",
    "description": "Sampéa is a perfume house that has not launched yet. Every bottle is 30 ml and every scent is 40% perfume oil. Join the launch list in our shop."
  },
  {
    "label": "Shop",
    "path": "/shop",
    "description": "Sampéa's first bottle: 30 ml, 40% perfume oil. Prices aren't public yet, so the product page has a launch list where the price will be."
  },
  {
    "label": "The Bottle",
    "path": "/the-bottle",
    "description": "The gold SAMPÉA wordmark and lotus, rectangular clear glass on a heavy base, a spray pump and a gold cap. 30 ml in every bottle."
  },
  {
    "label": "About",
    "path": "/about",
    "description": "Sampéa is a perfume house launching in Canada and the US. Every bottle is 30 ml and every scent is 40% perfume oil. Not yet launched."
  },
  {
    "label": "FAQ",
    "path": "/faq",
    "description": "Answers about Sampéa before launch: bottle size, perfume oil, where we're launching, and why there are no prices or scent names on the site yet."
  },
  {
    "label": "Contact",
    "path": "/contact",
    "description": "Write to Sampéa at contact@houseofsampea.com. We're a perfume house that hasn't launched yet, launching in Canada and the US."
  }
];

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    ...(FULL_ADDRESS ? [`- Address: ${FULL_ADDRESS}`] : []),
    ...(siteConfig.contact.phoneDisplay ? [`- Phone: ${siteConfig.contact.phoneDisplay}`] : []),
    ...(siteConfig.contact.email ? [`- Email: ${siteConfig.contact.email}`] : []),
    ...(siteConfig.hours.summary ? [`- Hours: ${siteConfig.hours.summary}`] : []),
    '',
    '## Pages',
    ...PAGES.map((p) => `- [${p.label}](${SITE_URL}${p.path === '/' ? '' : p.path}): ${p.description}`),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
