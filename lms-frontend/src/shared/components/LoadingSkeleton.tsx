export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="card">
      <Skeleton className="h-40 rounded-lg mb-3" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="card">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="card">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-3" />
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-40 mb-4" />
      <Skeleton className="h-8 w-96 mb-2" />
      <Skeleton className="h-4 w-full mb-6" />
      <Skeleton className="h-2 w-full mb-8" />
      <ListSkeleton count={3} />
    </div>
  );
}
