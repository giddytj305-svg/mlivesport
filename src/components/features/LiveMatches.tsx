"use client";
import useSWR from "swr";
import { fetchAPI } from "@/lib/api";
import { MatchCardSkeleton } from "@/components/ui/Skeleton";

// Fetcher for SWR
const fetcher = (url: string) => fetchAPI(url);

export default function LiveMatches() {
  // Poll every 30 seconds
  const { data, error, isLoading } = useSWR("/livescore", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <MatchCardSkeleton key={i} />)}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 text-center bg-card rounded-xl border border-gray-800">
        <p className="text-muted">Live data currently unavailable.</p>
      </div>
    );
  }

  // NOTE: Adjust 'any' to specific interface based on actual API response structure
  const matches = Array.isArray(data) ? data : (data as any).matches || [];

  if (matches.length === 0) {
     return (
      <div className="p-6 text-center bg-card rounded-xl border border-gray-800">
        <p className="text-muted">No live matches at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.slice(0, 10).map((match: any, idx: number) => (
        <div 
          key={idx} 
          className="group relative flex flex-col md:flex-row items-center justify-between p-5 bg-card rounded-xl border border-gray-800 hover:border-primary/50 transition-all cursor-pointer"
        >
          {/* Status Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Live</span>
          </div>

          <div className="flex items-center flex-1 justify-end gap-4 w-full md:w-auto mt-4 md:mt-0">
             <span className="text-sm font-medium text-white">{match.home_team || "Home"}</span>
             {/* Logo Placeholder */}
             <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs">H</div>
          </div>

          <div className="mx-6 text-center min-w-[80px]">
            <div className="text-2xl font-bold text-white tracking-widest">
              {match.home_score || 0} : {match.away_score || 0}
            </div>
            <div className="text-xs text-primary mt-1">{match.time || "HT"}</div>
          </div>

          <div className="flex items-center flex-1 justify-start gap-4 w-full md:w-auto">
             <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs">A</div>
             <span className="text-sm font-medium text-white">{match.away_team || "Away"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
