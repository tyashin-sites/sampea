'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Wires the declarative scroll effects ([data-fx="rise|draw|stagger"]) with
 * one IntersectionObserver, so SERVER components get choreography without
 * becoming client components. Re-runs on route change. Without IO support
 * (or under reduced motion, handled in CSS) everything is simply visible.
 */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.documentElement.classList.add('no-fx');
      return;
    }
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-fx]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
