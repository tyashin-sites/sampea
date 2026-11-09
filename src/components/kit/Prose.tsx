import { SectionHeading } from './SectionHeading';

export interface ProseProps {
  eyebrow?: string;
  headline: string;
  intro?: string;
  blocks: { heading?: string; paragraphs: string[]; bullets?: string[] }[];
  headingLevel?: 'h1' | 'h2';
}

/** Long-form and legal pages. */
export function Prose({ eyebrow, headline, intro, blocks, headingLevel = 'h1' }: ProseProps) {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={headline} lead={intro} as={headingLevel} />
        <div className="prose-site text-muted mt-10">
          {blocks.map((b, i) => (
            <div key={i}>
              {b.heading ? <h2 className="text-foreground">{b.heading}</h2> : null}
              {b.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {b.bullets?.length ? (
                <ul>
                  {b.bullets.map((li, k) => (
                    <li key={k}>{li}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
