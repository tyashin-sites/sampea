import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig, FULL_ADDRESS, MAILTO_URL, TEL_URL, PRIMARY_CTA } from '@/config/site';
import { CtaLink } from './CtaLink';
import { darkLogo, getBrandKit } from '@/lib/brand-kit';

export interface FooterProps {
  blurb: string;
  columns: { heading: string; links: { label: string; href: string }[] }[];
}

export async function Footer({ blurb, columns }: FooterProps) {
  const logo = darkLogo(await getBrandKit());
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark ink grain mt-24">
      <div className="container-x relative pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {logo ? (
              <img
                src={logo}
                alt={siteConfig.name}
                className="brand-logo block h-10 w-auto max-w-[13rem] object-contain"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <p className="font-heading text-2xl font-semibold tracking-tight">
                {siteConfig.name}
              </p>
            )}
            <p className="text-paper/75 mt-4 max-w-sm leading-relaxed">{blurb}</p>
            <ul className="mt-6 space-y-3 text-[15px]">
              {FULL_ADDRESS ? (
                <li className="flex gap-3">
                  <MapPin className="text-accent-soft h-5 w-5 shrink-0" aria-hidden />
                  <span>{FULL_ADDRESS}</span>
                </li>
              ) : null}
              {siteConfig.contact.phoneDisplay && TEL_URL ? (
                <li className="flex gap-3">
                  <Phone className="text-accent-soft h-5 w-5 shrink-0" aria-hidden />
                  <a
                    href={TEL_URL}
                    className="tt-mono text-[0.95rem] underline-offset-4 hover:underline"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              ) : null}
              {siteConfig.contact.email && MAILTO_URL ? (
                <li className="flex gap-3">
                  <Mail className="text-accent-soft h-5 w-5 shrink-0" aria-hidden />
                  <a href={MAILTO_URL} className="underline-offset-4 hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </li>
              ) : null}
            </ul>
            {PRIMARY_CTA ? (
              <div className="mt-7">
                <CtaLink cta={PRIMARY_CTA} />
              </div>
            ) : null}
          </div>
          {columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <h2 className="eyebrow">{col.heading}</h2>
              <ul className="space-y-2.5 text-[15px]">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-paper/80 hover:text-paper underline-offset-4 hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rule mt-14" data-fx="draw" aria-hidden />
        <div className="text-paper/60 mt-6 flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {siteConfig.legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-paper/10 mt-8 border-t pt-6 text-center">
          <p className="text-paper/50 text-xs">
            Powered by{' '}
            <a
              href="https://tyashin.com"
              target="_blank"
              rel="noopener"
              className="hover:underline"
            >
              Tyashin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
