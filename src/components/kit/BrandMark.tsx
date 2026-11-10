import { siteConfig } from '@/config/site';
import { getBrandKit, lightLogo } from '@/lib/brand-kit';

/**
 * The header's brand mark. Brand-kit logo first (changes in the Tyashin admin
 * appear without a rebuild); the name set as a wordmark in the display font is the fallback for a
 * project with no logo uploaded. Platform-owned (Website Studio kit).
 */
export async function BrandMark() {
  const kit = await getBrandKit();
  const logo = lightLogo(kit);
  if (logo) {
    return (
      <img
        src={logo}
        alt={siteConfig.name}
        className="brand-logo block h-9 w-auto max-w-[11rem] object-contain sm:h-10"
        fetchPriority="high"
        decoding="async"
      />
    );
  }
  // No logo: the name set as a wordmark in the display face. Never a
  // monogram-in-a-square placeholder (Sampéa 2026-11-10: it read as a
  // template, not a brand).
  return <span className="brand-wordmark">{siteConfig.name}</span>;
}
