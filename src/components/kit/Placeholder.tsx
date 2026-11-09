import Image from 'next/image';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageBrief {
  /** Alt text for the image. */
  alt: string;
  /** What the customer should supply while `src` is empty (docs/ASSET-DEBT.md). */
  brief: string;
  aspect: 'landscape' | 'portrait' | 'square' | 'wide';
  /** The real image URL. Without it the slot stays a visible placeholder. */
  src?: string;
  /** Set on the one above-the-fold image so it is not lazy-loaded (LCP). */
  priority?: boolean;
  /** Overrides the width guess derived from `aspect`. */
  sizes?: string;
}

const ASPECT: Record<ImageBrief['aspect'], string> = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
};

/** Wide images span the container; the rest sit in a narrower column. */
const SIZES: Record<ImageBrief['aspect'], string> = {
  landscape: '(min-width: 1024px) 50vw, 100vw',
  portrait: '(min-width: 1024px) 40vw, 100vw',
  square: '(min-width: 1024px) 40vw, 100vw',
  wide: '(min-width: 1024px) 80vw, 100vw',
};

/**
 * A media slot. With `src` it renders the real image; without one it shows
 * what belongs there, because the facts rule forbids inventing a photo.
 * The aspect box is fixed either way, so neither state shifts the layout.
 */
export function Placeholder({ image, className }: { image: ImageBrief; className?: string }) {
  if (image.src) {
    return (
      <figure className={cn('media-frame', ASPECT[image.aspect], className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={image.sizes ?? SIZES[image.aspect]}
          className="object-cover"
          priority={image.priority}
        />
      </figure>
    );
  }
  return (
    <figure
      className={cn('placeholder', ASPECT[image.aspect], className)}
      role="img"
      aria-label={image.alt}
    >
      <figcaption className="text-foreground/80 absolute inset-x-4 bottom-4 flex items-start gap-2 text-[13px] leading-snug">
        <Camera className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <span>
          <span className="font-semibold">Photo to add:</span> {image.brief}
        </span>
      </figcaption>
    </figure>
  );
}
