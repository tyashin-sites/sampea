import { siteConfig, FULL_ADDRESS } from '@/config/site';
import { SITE_URL } from '@/lib/seo';

/** /llms.txt — a plain, factual summary for AI answer engines. Facts only. */
export const dynamic = 'force-static';

const PAGES: { label: string; path: string; description: string }[] = [
  {
    "label": "Home",
    "path": "/",
    "description": "Sampéa is a perfume house that has not launched yet. Every bottle is 30 ml and every scent is 40% perfume oil. Write to us at contact@houseofsampea.com."
  },
  {
    "label": "About",
    "path": "/about",
    "description": "Sampéa is a perfume house preparing to launch in India, Canada and the US. One bottle size, 30 ml, and 40% perfume oil in every scent."
  },
  {
    "label": "Contact",
    "path": "/contact",
    "description": "Write to Sampéa at contact@houseofsampea.com with questions about the house, press enquiries or anything else. Sampéa has not launched yet."
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
