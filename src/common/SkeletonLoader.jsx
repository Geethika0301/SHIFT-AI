function SkeletonLoader({ rows = 3 }) {
  return (
    <div className="skeleton-wrapper">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row" />
      ))}
    </div>
  );
}

export default SkeletonLoader;