/** The ONE JSON-LD script a page emits — every node in a single @graph. */
export function JsonLd({ nodes }: { nodes: Record<string, unknown>[] }) {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(
    /</g,
    '\\u003c'
  );
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
