import type { Config } from 'tailwindcss';

// Tailwind tokens → brand CSS variables. Every colour the site uses resolves
// through a --brand-* variable declared in globals.css, so the palette is the
// single point of change and a custom section cannot drift off-brand.
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--brand-primary)',
        'primary-deep': 'var(--brand-primary-deep)',
        'primary-contrast': 'var(--brand-primary-contrast)',
        accent: 'var(--brand-accent)',
        'accent-soft': 'var(--brand-accent-soft)',
        ink: 'var(--brand-ink)',
        paper: 'var(--brand-paper)',
        background: 'var(--brand-bg)',
        surface: 'var(--brand-surface)',
        foreground: 'var(--brand-text)',
        muted: 'var(--brand-text-muted)',
        border: 'var(--brand-border)',
      },
      borderRadius: {
        sm: 'var(--brand-radius-sm)',
        md: 'var(--brand-radius-md)',
        lg: 'var(--brand-radius-lg)',
        full: 'var(--brand-radius-full)',
      },
      fontFamily: {
        heading: ['var(--brand-heading-font)'],
        body: ['var(--brand-body-font)'],
        mono: ['var(--brand-mono-font)'],
      },
    },
  },
} satisfies Config;
