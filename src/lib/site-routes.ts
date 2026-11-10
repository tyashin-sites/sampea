/**
 * SINGLE SOURCE OF TRUTH for the indexable URL tree (addendum §3g).
 * `/sitemap-pages.xml` renders this list. Blog POSTS are platform-owned and
 * live in the platform's content sitemap.
 */
export type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SiteRoute {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** YYYY-MM-DD of the page's last real content change. Omit when unknown:
   *  /sitemap-pages.xml then emits no <lastmod> for it (never the build date). */
  lastModified?: string;
}

const STATIC_ROUTES: SiteRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: 'weekly' },
  { path: "/shop", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/the-bottle", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/about", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/faq", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/contact", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/privacy", priority: 0.2, changeFrequency: 'yearly' },
  { path: "/terms", priority: 0.2, changeFrequency: 'yearly' },
];

export function getSiteRoutes(): SiteRoute[] {
  return STATIC_ROUTES;
}
