import { siteConfig } from '@/config/site';
import { getBrandKit, lightLogo } from '@/lib/brand-kit';

/**
 * The header's brand mark. Brand-kit logo first (changes in the Tyashin admin
 * appear without a rebuild); the monogram + name is only the fallback for a
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
  return (
    <>
      <span
        className="bg-primary text-primary-contrast inline-flex h-8 w-8 items-center justify-center rounded-md text-sm"
        aria-hidden
      >
        {siteConfig.shortName.charAt(0)}
      </span>
      <span>{siteConfig.shortName}</span>
    </>
  );
}
