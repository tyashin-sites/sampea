import { Placeholder, type ImageBrief } from './Placeholder';
import { SectionHeading } from './SectionHeading';

export interface GalleryProps {
  eyebrow?: string;
  headline?: string;
  items: ImageBrief[];
}

export function Gallery({ eyebrow, headline, items }: GalleryProps) {
  return (
    <section className="section">
      <div className="container-x">
        {headline ? (
          <SectionHeading eyebrow={eyebrow} title={headline} center className="max-w-2xl" />
        ) : null}
        <div
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${headline ? 'mt-14' : ''}`}
          data-fx="stagger"
        >
          {items.map((img, i) => (
            <Placeholder key={i} image={img} />
          ))}
        </div>
      </div>
    </section>
  );
}
