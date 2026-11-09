import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Icon, type IconName } from './Icon';
import { SectionHeading } from './SectionHeading';

export interface FeatureItem {
  title: string;
  body: string;
  icon?: IconName;
  /** Optional site route the card links to (e.g. a service page). */
  href?: string;
}

export interface FeaturesProps {
  /** grid: icon cards · list: numbered rows · alternating: large rows with a media slot */
  variant: 'grid' | 'list' | 'alternating';
  eyebrow?: string;
  headline: string;
  intro?: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  /** Render on the dark "ink" ground. */
  dark?: boolean;
}

const COLS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function Features({
  variant,
  eyebrow,
  headline,
  intro,
  items,
  columns = 3,
  dark,
}: FeaturesProps) {
  return (
    <section className={dark ? 'section on-dark ink grain' : 'section'}>
      <div className="container-x relative">
        <SectionHeading
          eyebrow={eyebrow}
          title={headline}
          lead={intro}
          center={variant === 'grid'}
          className="max-w-3xl"
        />

        {variant === 'grid' ? (
          <div className={`mt-14 grid gap-5 ${COLS[columns]}`} data-fx="stagger">
            {items.map((it) => {
              const inner = (
                <>
                  {it.icon ? (
                    <span className="bg-primary/10 text-primary inline-flex h-11 w-11 items-center justify-center rounded-md">
                      <Icon name={it.icon} className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                  ) : null}
                  <h3 className="tt-3 mt-5">{it.title}</h3>
                  <p className="text-muted mt-2 text-[15.5px] leading-relaxed">{it.body}</p>
                  {it.href ? (
                    <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                      Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  ) : null}
                </>
              );
              return it.href ? (
                <Link key={it.title} href={it.href} className="card block p-7">
                  {inner}
                </Link>
              ) : (
                <div key={it.title} className="card p-7">
                  {inner}
                </div>
              );
            })}
          </div>
        ) : null}

        {variant === 'list' ? (
          <ol className="divide-border border-border mt-12 divide-y border-t" data-fx="stagger">
            {items.map((it, i) => (
              <li key={it.title} className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                <span className="tt-mono text-primary md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="tt-3 md:col-span-4">
                  {it.href ? (
                    <Link href={it.href} className="underline-offset-4 hover:underline">
                      {it.title}
                    </Link>
                  ) : (
                    it.title
                  )}
                </h3>
                <p className="text-muted text-[15.5px] leading-relaxed md:col-span-7">{it.body}</p>
              </li>
            ))}
          </ol>
        ) : null}

        {variant === 'alternating' ? (
          <div className="mt-14 space-y-16">
            {items.map((it, i) => (
              <div
                key={it.title}
                className="grid items-center gap-8 lg:grid-cols-12"
                data-fx="rise"
              >
                <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <div className="placeholder aspect-[4/3]" aria-hidden />
                </div>
                <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-1' : ''}`}>
                  {it.icon ? (
                    <Icon name={it.icon} className="text-primary h-6 w-6" strokeWidth={1.75} />
                  ) : null}
                  <h3 className="tt-2 mt-4">{it.title}</h3>
                  <p className="lead mt-4">{it.body}</p>
                  {it.href ? (
                    <Link
                      href={it.href}
                      className="text-primary mt-6 inline-flex items-center gap-1 font-semibold"
                    >
                      Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
