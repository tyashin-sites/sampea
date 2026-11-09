import localFont from 'next/font/local';

// Type stack (docs/DESIGN-SPEC.md), SELF-HOSTED via next/font/local so the CI
// build never depends on a network fetch to Google Fonts.
//   Headings — Cormorant Garamond
//   Body     — Manrope
//   Data     — JetBrains Mono

export const headingFont = localFont({
  src: [{ path: '../fonts/cormorant-garamond.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-heading',
  display: 'swap',
});

export const bodyFont = localFont({
  src: [{ path: '../fonts/manrope.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
});

export const monoFont = localFont({
  src: [{ path: '../fonts/jetbrains-mono.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});
