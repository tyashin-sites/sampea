import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">404</p>
        <h1 className="tt-display">That page is not here.</h1>
        <p className="lead mt-6">
          The address may be out of date, or the page has moved. Here is where most people are
          heading.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {[{ label: 'Home', href: '/' }, ...siteConfig.nav].map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="card font-heading flex items-center justify-between p-5 font-medium"
              >
                {n.label} <ArrowRight className="text-accent h-4 w-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
