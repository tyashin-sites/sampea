import { SITE_URL } from '@/lib/seo';

/**
 * /robots.txt — crawl-access policy only. Preview indexing is controlled by
 * the X-Robots-Tag header in middleware. On the slug subdomain the platform
 * may intercept this path with its own.
 */
export const dynamic = 'force-static';

export function GET() {
  const body = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
