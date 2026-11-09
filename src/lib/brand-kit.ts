/**
 * The project's Tyashin brand kit, read at RUNTIME — so a logo or colour the
 * customer changes in the Tyashin admin reaches every page within the
 * revalidation window, with no rebuild and no regeneration.
 *
 * Precedence, everywhere the site shows brand identity:
 *   1. brand kit (what the customer set in Tyashin),
 *   2. the site's own design (globals.css palette, the monogram mark).
 *
 * Never throws: a slow or failing API means the site's own design shows,
 * never a broken page. Platform-owned file (Website Studio kit).
 */
import { cache } from 'react';
import { TYASHIN_API_ORIGIN, TYASHIN_PROJECT_ID } from '@/config/site';
import { parseBrandKit, type BrandKit } from './brand-kit-css';

export { brandKitCss, darkLogo, lightLogo, type BrandKit } from './brand-kit-css';

/** Seconds between brand-kit refreshes on a live page. */
export const BRAND_KIT_REVALIDATE = 300;
// brand-kit.json answers in ~5 s on a cold Atlas connect (measured 2026-11-09). The fetch runs at
// build or in ISR background revalidation, never in front of a visitor, so wait for it.
const FETCH_TIMEOUT_MS = 10_000;

const EMPTY: BrandKit = { logo: {}, colors: {} };

/** One fetch per render (React cache), edge/ISR cached for BRAND_KIT_REVALIDATE seconds. */
export const getBrandKit = cache(async (): Promise<BrandKit> => {
  if (!TYASHIN_PROJECT_ID) return EMPTY;
  const origin = (process.env.TYASHIN_API_URL || TYASHIN_API_ORIGIN).replace(/\/+$/, '');
  const url = `${origin}/api/v1/public/brand-kit.json?projectId=${encodeURIComponent(TYASHIN_PROJECT_ID)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: BRAND_KIT_REVALIDATE },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return EMPTY;
    return parseBrandKit(await res.json());
  } catch {
    return EMPTY;
  }
});
