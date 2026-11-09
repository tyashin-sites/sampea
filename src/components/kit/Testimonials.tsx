import { Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export interface TestimonialsProps {
  eyebrow?: string;
  headline?: string;
  /** Real quotes the customer supplied, or clearly-labelled placeholders. */
  items: { quote: string; name: string; role?: string }[];
}

const COLS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

export function Testimonials({ eyebrow, headline, items }: TestimonialsProps) {
  const cols = COLS[Math.min(Math.max(items.length, 1), 3)];
  return (
    <section className="section">
      <div className="container-x">
        {headline ? (
          <SectionHeading eyebrow={eyebrow} title={headline} center className="max-w-2xl" />
        ) : null}
        <div className={`grid gap-5 ${cols} ${headline ? 'mt-14' : ''}`} data-fx="stagger">
          {items.map((t) => (
            <figure key={t.name + t.quote.slice(0, 12)} className="card flex flex-col p-7">
              <Quote className="text-accent h-6 w-6" aria-hidden />
              <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{t.name}</span>
                {t.role ? <span className="text-muted"> · {t.role}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
