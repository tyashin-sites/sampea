import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageBrief {
  /** Alt text for the eventual real image. */
  alt: string;
  /** What the customer should supply (recorded in docs/ASSET-DEBT.md). */
  brief: string;
  aspect: 'landscape' | 'portrait' | 'square' | 'wide';
}

const ASPECT: Record<ImageBrief['aspect'], string> = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
};

/**
 * A visibly-placeholder media slot. The facts rule forbids fake photos, so
 * until the customer supplies the real asset this shows what belongs here.
 */
export function Placeholder({ image, className }: { image: ImageBrief; className?: string }) {
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
