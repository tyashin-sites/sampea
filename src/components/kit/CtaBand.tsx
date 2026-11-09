import { CtaLink, type CtaProps } from './CtaLink';

export interface CtaBandProps {
  eyebrow?: string;
  headline: string;
  body?: string;
  primaryCta: CtaProps;
  secondaryCta?: CtaProps;
  /** Small factual line under the buttons (hours policy, response time). */
  note?: string;
}

/** The closing band — one action, restated once. */
export function CtaBand({ eyebrow, headline, body, primaryCta, secondaryCta, note }: CtaBandProps) {
  return (
    <section className="section on-dark ink grain">
      <div className="container-x relative text-center">
        <div className="rule mx-auto mb-10 max-w-xs" data-fx="draw" aria-hidden />
        {eyebrow ? (
          <p className="eyebrow eyebrow-center" data-fx="rise">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="tt-1 mx-auto max-w-3xl" data-fx="rise">
          {headline}
        </h2>
        {body ? (
          <p className="lead text-paper/75 mx-auto mt-6" data-fx="rise">
            {body}
          </p>
        ) : null}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row" data-fx="stagger">
          <CtaLink cta={primaryCta} className="px-7 py-4 text-base" />
          {secondaryCta ? (
            <CtaLink cta={secondaryCta} variant="ghost" className="px-7 py-4 text-base" />
          ) : null}
        </div>
        {note ? <p className="text-paper/60 mt-6 text-sm">{note}</p> : null}
      </div>
    </section>
  );
}
