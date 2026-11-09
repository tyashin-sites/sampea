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
}

const STATIC_ROUTES: SiteRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: 'weekly' },
  { path: "/about", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/contact", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/privacy", priority: 0.2, changeFrequency: 'yearly' },
  { path: "/terms", priority: 0.2, changeFrequency: 'yearly' },
];

export function getSiteRoutes(): SiteRoute[] {
  return STATIC_ROUTES;
}
