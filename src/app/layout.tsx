import type { Metadata, Viewport } from 'next';
import { bodyFont, headingFont, monoFont } from '@/lib/fonts';
import { siteConfig } from '@/config/site';
import { SITE, siteUrl } from '@/lib/seo';
import { Header } from '@/components/kit/Header';
import { Footer } from '@/components/kit/Footer';
import { BrandKitStyle } from '@/components/kit/BrandKitStyle';
import { Reveal } from '@/components/kit/Reveal';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl('/')),
  title: {
    default: `${SITE.name} — ${siteConfig.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl('/'),
    title: SITE.name,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: "#F3ECE0" },
    { media: '(prefers-color-scheme: dark)', color: "#1C1A1F" },
  ],
};

// First-frame ground: html/body take the page background before the CSS
// bundle arrives, so there is no white flash on dark schemes.
const FIRST_FRAME_CSS = `
html, body { background-color: #F3ECE0; }
@media (prefers-color-scheme: dark) { html:root:not([data-theme="light"]), html:root:not([data-theme="light"]) body { background-color: color-mix(in oklab, #1C1A1F 88%, #000000); } }
html:root[data-theme="dark"], html:root[data-theme="dark"] body { background-color: color-mix(in oklab, #1C1A1F 88%, #000000); }
`;

const FOOTER = {
  "blurb": "Perfume oil for Canada and the US. Every bottle 30 ml, every scent 40% perfume oil, one bottle for the whole house.",
  "columns": [
    {
      "heading": "Sampéa",
      "links": [
        {
          "label": "The Bottle",
          "href": "/the-bottle"
        },
        {
          "label": "About",
          "href": "/about"
        },
        {
          "label": "Blog",
          "href": "/blog"
        }
      ]
    },
    {
      "heading": "Shop",
      "links": [
        {
          "label": "Shop",
          "href": "/shop"
        },
        {
          "label": "Cart",
          "href": "/cart"
        }
      ]
    },
    {
      "heading": "Help",
      "links": [
        {
          "label": "FAQ",
          "href": "/faq"
        },
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-style="luxury" className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: FIRST_FRAME_CSS }} />
        {/* Brand kit first: the customer's Tyashin colours over this palette. */}
        <BrandKitStyle />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-clip">
          {children}
        </main>
        <Footer blurb={FOOTER.blurb} columns={FOOTER.columns} />
        <Reveal />
      </body>
    </html>
  );
}
