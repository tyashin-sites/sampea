'use client';

import { useEffect, useRef, useState } from 'react';
import type React from 'react';

/**
 * The customer's own Thridify 3D model, as thridify.com embeds it: the real
 * <thridify-view> web component from viewer.thridify.com (rotate, zoom, AR on
 * phones). Platform-owned (Website Studio kit).
 *
 * Performance laws: the frame reserves its box (aspect 4/3, no CLS), and the
 * viewer script loads only when the block nears the viewport, so it never
 * competes with the page's LCP. The viewer needs BOTH product-id and
 * preview-id (preview-id alone throws "Product ID is required").
 */
export interface Model3dProps {
  eyebrow?: string;
  headline?: string;
  body?: string;
  accountId: string;
  productId: string;
  previewId: string;
  variantId?: string;
  /** Short noun for the accessible label ("bottle"). */
  label: string;
}

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'thridify-view': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Record<string, unknown>,
        HTMLElement
      >;
    }
  }
}

const VIEWER = 'https://viewer.thridify.com/mviewer.js';

function loadViewer() {
  if (document.querySelector('script[data-thridify-mviewer]')) return;
  const s = document.createElement('script');
  s.src = VIEWER;
  s.async = true;
  s.setAttribute('data-thridify-mviewer', '');
  document.head.appendChild(s);
}

export function Model3d(props: Model3dProps) {
  const { eyebrow, headline, body, accountId, productId, previewId, variantId, label } = props;
  const frame = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          loadViewer();
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section">
      <div className="container-x">
        {eyebrow || headline || body ? (
          <div className="mb-10 max-w-2xl" data-fx="rise">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {headline ? <h2 className="tt-2">{headline}</h2> : null}
            {body ? <p className="text-muted mt-5">{body}</p> : null}
          </div>
        ) : null}
        <div
          ref={frame}
          className="model3d-frame relative aspect-[4/3] w-full overflow-hidden"
          role="group"
          aria-label={`Interactive 3D ${label}: drag to turn it, pinch or scroll to zoom`}
        >
          {near ? (
            <thridify-view
              account-id={accountId}
              product-id={productId}
              preview-id={previewId}
              {...(variantId ? { 'variant-id': variantId } : {})}
              data-thridify-mode="ready"
              style={{ display: 'block', width: '100%', height: '100%' }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
