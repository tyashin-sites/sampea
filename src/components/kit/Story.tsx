import { Placeholder, type ImageBrief } from './Placeholder';
import { SectionHeading } from './SectionHeading';

export interface StoryProps {
  variant: 'split' | 'stacked';
  eyebrow?: string;
  headline: string;
  paragraphs: string[];
  image?: ImageBrief;
  imageSide?: 'left' | 'right';
  /** Label/value facts ("Founded", "2011"). Only facts the customer gave. */
  facts?: { label: string; value: string }[];
}

export function Story({
  variant,
  eyebrow,
  headline,
  paragraphs,
  image,
  imageSide = 'right',
  facts,
}: StoryProps) {
  const copy = (
    <>
      <SectionHeading eyebrow={eyebrow} title={headline} />
      <div className="prose-site text-muted mt-6" data-fx="rise">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {facts?.length ? (
        <dl className="mt-8 grid gap-6 sm:grid-cols-2" data-fx="stagger">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow mb-1">{f.label}</dt>
              <dd className="font-heading text-lg font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </>
  );
  if (variant === 'stacked' || !image) {
    return (
      <section className="section">
        <div className="container-x max-w-3xl">
          {copy}
          {image ? (
            <div className="mt-12" data-fx="rise">
              <Placeholder image={{ ...image, aspect: 'wide' }} />
            </div>
          ) : null}
        </div>
      </section>
    );
  }
  return (
    <section className="section">
      <div className="container-x grid items-start gap-12 lg:grid-cols-12">
        <div
          className={`lg:col-span-5 ${imageSide === 'left' ? 'lg:order-1' : 'lg:order-2'}`}
          data-fx="rise"
        >
          <Placeholder image={image} />
        </div>
        <div className={`lg:col-span-7 ${imageSide === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
          {copy}
        </div>
      </div>
    </section>
  );
}
