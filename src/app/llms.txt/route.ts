import { siteConfig, FULL_ADDRESS } from '@/config/site';
import { SITE_URL } from '@/lib/seo';

/** /llms.txt — a plain, factual summary for AI answer engines. Facts only. */
export const dynamic = 'force-static';

const PAGES: { label: string; path: string; description: string }[] = [
  {
    "label": "Home",
    "path": "/",
    "description": "Sampéa makes perfume oil for Canada and the US. Every bottle holds 30 ml and every scent is 40% perfume oil. One bottle for the whole house."
  },
  {
    "label": "Shop",
    "path": "/shop",
    "description": "The scents of Sampéa, each in the same 30 ml bottle at 40% perfume oil. Open a scent's own page to add your name to its list."
  },
  {
    "label": "The Bottle",
    "path": "/the-bottle",
    "description": "One bottle across the whole house: the gold SAMPÉA wordmark and the lotus, a gold cap and a heavy glass base. Every bottle holds 30 ml."
  },
  {
    "label": "About",
    "path": "/about",
    "description": "Sampéa is a perfume house built on access, for people in Canada and the US who want a scent few others wear. Meet Le Cercle Sampéa."
  },
  {
    "label": "FAQ",
    "path": "/faq",
    "description": "Answers about Sampéa: the 30 ml bottle, the 40% perfume oil in every scent, where the house is available and how to reach us."
  },
  {
    "label": "Contact",
    "path": "/contact",
    "description": "Write to Sampéa at contact@houseofsampea.com with questions about the bottle, the scents or Le Cercle Sampéa. Email reaches the house."
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
