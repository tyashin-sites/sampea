import { SectionHeading } from './SectionHeading';

export interface StatsProps {
  eyebrow?: string;
  headline?: string;
  /** Only numbers the customer actually gave. */
  items: { value: string; label: string }[];
  dark?: boolean;
}

const COLS: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function Stats({ eyebrow, headline, items, dark }: StatsProps) {
  const cols = COLS[Math.min(Math.max(items.length, 1), 4)];
  return (
    <section className={dark ? 'section on-dark ink grain' : 'section'}>
      <div className="container-x relative">
        {headline ? (
          <SectionHeading eyebrow={eyebrow} title={headline} center className="max-w-2xl" />
        ) : null}
        <dl className={`grid gap-8 ${cols} ${headline ? 'mt-14' : ''}`} data-fx="stagger">
          {items.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="font-heading text-5xl font-semibold tracking-tight md:text-6xl">
                {s.value}
              </dd>
              <dt className="text-muted mt-3 text-sm uppercase tracking-[0.18em]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
