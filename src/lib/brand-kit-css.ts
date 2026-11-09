/**
 * Pure brand-kit helpers (no imports): parse the platform's brand-kit.json and
 * turn the customer's colours into override CSS. Kept import-free so the
 * runner's tests exercise exactly the code every site ships.
 * Platform-owned (Website Studio kit). Runtime fetch lives in ./brand-kit.ts.
 */
export interface BrandKitLogo {
  light?: string;
  dark?: string;
  monogram?: string;
  aspectRatio?: string;
}

export type BrandColorKey =
  | 'primary'
  | 'primaryContrast'
  | 'accent'
  | 'background'
  | 'surface'
  | 'text'
  | 'textMuted'
  | 'border';

export interface BrandKit {
  logo: BrandKitLogo;
  /** Only the colours the customer chose (the platform drops untouched defaults). */
  colors: Partial<Record<BrandColorKey, string>>;
}

const SAFE_COLOR =
  /^(#[0-9a-f]{3,4}|#[0-9a-f]{6}|#[0-9a-f]{8}|(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix)\([0-9a-z.,%/+\-\s#()]*\)|[a-z]{3,20})$/i;

function safeColor(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  return s && s.length <= 60 && SAFE_COLOR.test(s) && !/[;{}<>"'\\]/.test(s) ? s : null;
}

function safeUrl(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  return /^https:\/\/[^\s"'<>]+$/i.test(s) ? s : undefined;
}

const COLOR_KEYS: BrandColorKey[] = [
  'primary',
  'primaryContrast',
  'accent',
  'background',
  'surface',
  'text',
  'textMuted',
  'border',
];

export function parseBrandKit(data: unknown): BrandKit {
  const d = (data && typeof data === 'object' ? data : {}) as Record<string, unknown>;
  const logo = (d.logo && typeof d.logo === 'object' ? d.logo : {}) as Record<string, unknown>;
  // `colorsSet` = the customer's choices. A platform too old to send it gives
  // no colour overrides at all (raw `colors` holds form defaults).
  const set = (d.colorsSet && typeof d.colorsSet === 'object' ? d.colorsSet : {}) as Record<
    string,
    unknown
  >;
  const colors: BrandKit['colors'] = {};
  for (const k of COLOR_KEYS) {
    const c = safeColor(set[k]);
    if (c) colors[k] = c;
  }
  return {
    logo: {
      light: safeUrl(logo.light),
      dark: safeUrl(logo.dark),
      monogram: safeUrl(logo.monogram),
      aspectRatio: typeof logo.aspectRatio === 'string' ? logo.aspectRatio : undefined,
    },
    colors,
  };
}

/** The header/light-surface logo, if the customer uploaded one. */
export function lightLogo(kit: BrandKit): string | undefined {
  return kit.logo.light || kit.logo.dark;
}

/** A logo for dark surfaces (footer): only an explicit dark variant — a light logo would vanish. */
export function darkLogo(kit: BrandKit): string | undefined {
  return kit.logo.dark;
}

/**
 * CSS that lays the customer's brand-kit colours over the site palette.
 *
 * Specificity is the precedence: globals.css declares the site palette on
 * `html:root` (0,1,1) and its dark scheme on `:root:not([data-theme=light])`
 * / `:root[data-theme=dark]` (0,2,0). These rules use `html:root:not(...)`
 * (0,2,1), so they win in BOTH places without !important.
 *
 * Light scheme: the customer's brand colours, plus their background/surface/
 * text/muted/border when they set at least background AND text. Dark scheme: only primary and
 * accent — a brand kit has no dark palette, and its light background/text
 * would wreck the site's dark one. Derived tokens (primary-deep, accent-soft,
 * surface) are re-mixed from the overridden colours so hovers stay on-brand.
 */
export function brandKitCss(kit: BrandKit): string {
  const c = kit.colors;
  const light: string[] = [];
  const add = (prop: string, v: string | undefined) => v && light.push(`${prop}:${v}`);
  add('--brand-primary', c.primary);
  if (c.primary)
    add('--brand-primary-deep', `color-mix(in oklab, ${c.primary} 82%, var(--brand-ink))`);
  add('--brand-primary-contrast', c.primaryContrast);
  add('--brand-accent', c.accent);
  if (c.accent) add('--brand-accent-soft', `color-mix(in oklab, ${c.accent} 68%, #ffffff)`);
  // Surface colours move only as a set: a customer background without their
  // text colour (or the reverse) would put the site's text on the wrong ground.
  // --brand-paper is left alone: it is the light ink on the site's dark bands.
  if (c.background && c.text) {
    add('--brand-bg', c.background);
    add('--brand-surface', c.surface);
    add('--brand-text', c.text);
    add('--brand-text-muted', c.textMuted);
    add('--brand-border', c.border);
  }
  if (!light.length) return '';
  // The layout's first-frame CSS paints <html> in the site background; follow the kit's.
  if (c.background && c.text) light.push('background-color:var(--brand-bg)');

  const darkPrimary = c.accent || c.primary;
  const dark: string[] = [];
  if (darkPrimary) {
    dark.push(`--brand-primary:${darkPrimary}`);
    dark.push(`--brand-primary-deep:color-mix(in oklab, ${darkPrimary} 80%, #ffffff)`);
  }
  if (c.accent) dark.push(`--brand-accent:${c.accent}`);

  const lightSel = "html:root:not([data-theme='dark'])";
  const darkAuto = "html:root:not([data-theme='light'])";
  const darkForced = "html:root:is([data-theme='dark'])";
  let css = `@media (prefers-color-scheme: light){${lightSel}{${light.join(';')}}}`;
  css += `html:root:is([data-theme='light']){${light.join(';')}}`;
  if (dark.length) {
    css += `@media (prefers-color-scheme: dark){${darkAuto}{${dark.join(';')}}}`;
    css += `${darkForced}{${dark.join(';')}}`;
  }
  return css;
}
