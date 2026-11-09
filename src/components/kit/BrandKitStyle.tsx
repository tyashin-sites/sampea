import { brandKitCss, getBrandKit } from '@/lib/brand-kit';

/**
 * Lays the customer's brand-kit colours over the site palette (see
 * brandKitCss for the precedence rules). Renders nothing when the customer
 * has set no colours, so the site's own design shows. Platform-owned.
 */
export async function BrandKitStyle() {
  const css = brandKitCss(await getBrandKit());
  if (!css) return null;
  return <style data-tyashin-brand-kit-override dangerouslySetInnerHTML={{ __html: css }} />;
}
