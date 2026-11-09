'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CtaLink, type CtaProps } from './CtaLink';

interface NavItem {
  label: string;
  href: string;
}

/**
 * Full-screen menu on the ink ground. Portalled to <body> (the blurred sticky
 * header would otherwise become the containing block). CSS transitions only.
 * A11y: aria-expanded/controls, role=dialog, Escape closes, focus managed,
 * body scroll locked while open.
 */
export function MobileNav({ nav, cta }: { nav: NavItem[]; cta: CtaProps | null }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) firstLinkRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const panel = open ? (
    <div
      id="mobile-nav-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="on-dark ink grain fixed inset-0 z-[70] overflow-y-auto lg:hidden"
    >
      <div
        className="relative flex min-h-full flex-col px-5 pb-8"
        style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex h-[72px] items-center justify-between">
          <span className="font-heading text-lg font-medium tracking-tight">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="border-paper/25 inline-flex h-11 w-11 items-center justify-center rounded-full border"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>
        <nav aria-label="Primary" className="mt-4">
          <ol className="divide-paper/10 border-paper/10 divide-y border-t">
            {[{ label: 'Home', href: '/' }, ...nav].map((item, i) => (
              <li key={item.href}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={close}
                  className="group flex items-baseline gap-5 py-4 transition-[padding] duration-300 hover:pl-1"
                >
                  <span className="tt-mono text-accent-soft w-7 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-heading flex-1 text-[1.75rem] font-medium leading-none tracking-tight">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="text-accent-soft h-5 w-5 shrink-0 self-center"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {cta ? (
          <div className="mt-8">
            <CtaLink cta={cta} className="w-full py-4 text-base" />
          </div>
        ) : null}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        className="border-border text-foreground inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
      >
        <span className="relative block h-3 w-5" aria-hidden>
          <span className="absolute left-0 top-0 h-px w-full bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-3/4 bg-current" />
          <span className="absolute bottom-0 left-0 h-px w-full bg-current" />
        </span>
      </button>
      {mounted && panel ? createPortal(panel, document.body) : null}
    </>
  );
}
