import { SectionHeading } from './SectionHeading';

export interface FaqProps {
  eyebrow?: string;
  headline?: string;
  items: { q: string; a: string }[];
}

/** Native <details> accordion — no JS, keyboard-accessible, answers in the server HTML. */
export function Faq({ eyebrow, headline, items }: FaqProps) {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        {headline ? <SectionHeading eyebrow={eyebrow} title={headline} /> : null}
        <div
          className={`divide-border border-border divide-y border-b border-t ${headline ? 'mt-10' : ''}`}
          data-fx="stagger"
        >
          {items.map((it) => (
            <details key={it.q} className="group py-1">
              <summary className="font-heading flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-[1.0625rem] font-medium [&::-webkit-details-marker]:hidden">
                <span>{it.q}</span>
                <span
                  className="border-border relative h-6 w-6 shrink-0 rounded-full border"
                  aria-hidden
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 group-open:rotate-90" />
                </span>
              </summary>
              <p className="text-muted pb-5 pr-10 text-[15.5px] leading-relaxed">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
