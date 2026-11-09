import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface CtaProps {
  label: string;
  /** A site route (`/contact`), `tel:`, `mailto:` or an https URL. */
  href: string;
}

const EXTERNAL = /^(https?:|tel:|mailto:)/;

export function CtaLink({
  cta,
  variant = 'primary',
  className,
}: {
  cta: CtaProps;
  variant?: 'primary' | 'ghost';
  className?: string;
}) {
  const cls = cn('btn', variant === 'primary' ? 'btn-primary' : 'btn-ghost', className);
  if (EXTERNAL.test(cta.href)) {
    const http = cta.href.startsWith('http');
    return (
      <a
        href={cta.href}
        className={cls}
        {...(http ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {cta.label}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={cls}>
      {cta.label}
    </Link>
  );
}
