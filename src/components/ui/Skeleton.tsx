export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-secondary rounded ${className}`} />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-card rounded-xl border border-gray-800">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-24 h-4" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-10 h-3" />
      </div>
      <div className="flex items-center gap-4 text-right">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}
