import { CtaLink, type CtaProps } from './CtaLink';
import { Placeholder, type ImageBrief } from './Placeholder';

export interface HeroProps {
  /** split: copy left, media right · centered: copy centred, no media ·
   *  editorial: oversized headline, facts strip · stacked: copy over media */
  variant: 'split' | 'centered' | 'editorial' | 'stacked';
  eyebrow?: string;
  headline: string;
  sub?: string;
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  image?: ImageBrief;
  /** Short proof points shown under the CTAs ("Since 1998", "Same-day quotes"). */
  facts?: string[];
}

function Ctas({
  primaryCta,
  secondaryCta,
  center,
}: Pick<HeroProps, 'primaryCta' | 'secondaryCta'> & { center?: boolean }) {
  if (!primaryCta && !secondaryCta) return null;
  return (
    <div
      className={`reveal mt-9 flex flex-col gap-3 sm:flex-row ${center ? 'justify-center' : ''}`}
      style={{ animationDelay: '200ms' }}
    >
      {primaryCta ? <CtaLink cta={primaryCta} className="px-7 py-4 text-base" /> : null}
      {secondaryCta ? (
        <CtaLink cta={secondaryCta} variant="ghost" className="px-7 py-4 text-base" />
      ) : null}
    </div>
  );
}

function Facts({ facts, center }: { facts?: string[]; center?: boolean }) {
  if (!facts?.length) return null;
  return (
    <ul
      className={`reveal text-muted mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm ${center ? 'justify-center' : ''}`}
      style={{ animationDelay: '280ms' }}
    >
      {facts.map((f) => (
        <li key={f} className="flex items-center gap-2">
          <span className="bg-accent h-1.5 w-1.5 rounded-full" aria-hidden />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function Hero(props: HeroProps) {
  const { variant, eyebrow, headline, sub, image } = props;

  if (variant === 'centered') {
    return (
      <section className="section relative overflow-hidden">
        <div className="container-x text-center">
          {eyebrow ? <p className="eyebrow eyebrow-center reveal">{eyebrow}</p> : null}
          <h1 className="tt-display reveal mx-auto max-w-4xl" style={{ animationDelay: '80ms' }}>
            {headline}
          </h1>
          {sub ? (
            <p className="lead reveal mx-auto mt-6" style={{ animationDelay: '140ms' }}>
              {sub}
            </p>
          ) : null}
          <Ctas {...props} center />
          <Facts facts={props.facts} center />
        </div>
      </section>
    );
  }

  if (variant === 'editorial') {
    return (
      <section className="section relative overflow-hidden">
        <div className="container-x">
          {eyebrow ? <p className="eyebrow reveal">{eyebrow}</p> : null}
          <h1 className="tt-display reveal max-w-5xl" style={{ animationDelay: '80ms' }}>
            {headline}
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {sub ? (
                <p className="lead reveal" style={{ animationDelay: '140ms' }}>
                  {sub}
                </p>
              ) : null}
              <Ctas {...props} />
              <Facts facts={props.facts} />
            </div>
            {image ? (
              <div className="reveal lg:col-span-7" style={{ animationDelay: '220ms' }}>
                <Placeholder image={image} />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'stacked') {
    return (
      <section className="section relative overflow-hidden pb-0">
        <div className="container-x">
          <div className="max-w-3xl">
            {eyebrow ? <p className="eyebrow reveal">{eyebrow}</p> : null}
            <h1 className="tt-display reveal" style={{ animationDelay: '80ms' }}>
              {headline}
            </h1>
            {sub ? (
              <p className="lead reveal mt-6" style={{ animationDelay: '140ms' }}>
                {sub}
              </p>
            ) : null}
            <Ctas {...props} />
            <Facts facts={props.facts} />
          </div>
          {image ? (
            <div className="reveal mt-14" style={{ animationDelay: '260ms' }}>
              <Placeholder image={{ ...image, aspect: 'wide' }} />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="section relative overflow-hidden">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          {eyebrow ? <p className="eyebrow reveal">{eyebrow}</p> : null}
          <h1 className="tt-display reveal" style={{ animationDelay: '80ms' }}>
            {headline}
          </h1>
          {sub ? (
            <p className="lead reveal mt-6" style={{ animationDelay: '140ms' }}>
              {sub}
            </p>
          ) : null}
          <Ctas {...props} />
          <Facts facts={props.facts} />
        </div>
        <div className="reveal lg:col-span-6" style={{ animationDelay: '220ms' }}>
          {image ? (
            <Placeholder image={image} />
          ) : (
            <div className="placeholder aspect-[4/3]" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}
