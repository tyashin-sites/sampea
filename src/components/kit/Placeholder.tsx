import { cn } from '@/lib/utils';

export interface ImageBrief {
  /** Alt text for the eventual real image. */
  alt: string;
  /** What the customer should supply (recorded in docs/ASSET-DEBT.md). */
  brief: string;
  aspect: 'landscape' | 'portrait' | 'square' | 'wide';
  /**
   * The real photo, once the customer supplied it (a Tyashin media-library
   * URL, set by the runner from an upload, never by a model). Absent = the
   * tonal placeholder below.
   */
  src?: string;
  /**
   * Where the photo's subject sits, so a crop into a narrower slot keeps it
   * (a wide hero shot with the bottle on the right, shown in a portrait
   * column, used to show only empty paper). Set by the runner with `src`.
   */
  focus?: 'center' | 'left' | 'right' | 'top' | 'bottom';
}

const FOCUS: Record<NonNullable<ImageBrief['focus']>, string> = {
  center: 'object-center',
  left: 'object-left',
  right: 'object-right',
  top: 'object-top',
  bottom: 'object-bottom',
};

const ASPECT: Record<ImageBrief['aspect'], string> = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
};

/**
 * A media slot with no photo yet. The facts rule forbids fake photos, and a
 * live site must not look unfinished either: until the customer supplies the
 * real asset this renders a quiet tonal panel in the brand colours, with NO
 * visible "photo to add" text (that shipped on the first real build,
 * 2026-11-09). What belongs here is recorded in docs/ASSET-DEBT.md and kept
 * on the element as data-asset-brief for the admin.
 */
export function Placeholder({
  image,
  className,
  priority = false,
}: {
  image: ImageBrief;
  className?: string;
  /** Above-the-fold media (the hero): load eagerly, it is the LCP element. */
  priority?: boolean;
}) {
  if (image.src) {
    return (
      <div className={cn('relative overflow-hidden', ASPECT[image.aspect], className)}>
        {/* A plain img on purpose: library URLs are already optimised by the
            platform's image service, and next/image would need a loader. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            FOCUS[image.focus ?? 'center'] ?? 'object-center'
          )}
        />
      </div>
    );
  }
  return (
    <div
      className={cn('placeholder', ASPECT[image.aspect], className)}
      aria-hidden
      data-asset-brief={image.brief || image.alt || undefined}
    />
  );
}
