export default function Loading() {
  return (
    <div className="container-x section animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="bg-surface h-3 w-40 rounded" />
      <div className="bg-surface mt-6 h-12 w-3/4 max-w-2xl rounded" />
      <div className="bg-surface mt-4 h-6 w-2/3 max-w-xl rounded" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-surface h-48 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
