import LiveMatches from "@/components/features/LiveMatches";
import { fetchAPI } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";

async function BettingTips() {
  const tips = await fetchAPI<any>("/bet");
  
  // Fallback UI if API fails
  if (!tips) return (
    <div className="p-4 bg-card rounded-xl border border-gray-800">
       <h3 className="text-white font-bold mb-2">Betting Tips</h3>
       <p className="text-sm text-muted">Tips unavailable right now.</p>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-gray-800 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold">Today's Sure Bets</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">High Win Rate</span>
      </div>
      
      <div className="space-y-4">
        {/* Render only first 3 tips to fit sidebar */}
        {(Array.isArray(tips) ? tips : []).slice(0, 3).map((tip: any, i: number) => (
          <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-0">
            <div>
              <p className="text-sm text-white">{tip.match || "Team A vs Team B"}</p>
              <p className="text-xs text-muted">{tip.prediction || "Home Win"}</p>
            </div>
            <span className="text-sm font-bold text-primary">{tip.odds || "1.85"}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 bg-primary text-black text-sm font-bold rounded hover:bg-primary-hover transition">
        Place a Bet
      </button>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column (2/3) */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Hero Section (Visual like the image) */}
        <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black border border-gray-800">
           {/* Abstract Background Design */}
           <div className="absolute inset-0 bg-[url('https://placehold.co/800x400/111/111.png')] opacity-20 bg-cover bg-center" />
           
           <div className="relative z-10 flex flex-col justify-center h-full px-8">
             <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Featured Match</span>
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
               El Clásico
             </h1>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full opacity-80" />
                  <span className="text-white font-bold">Real Madrid</span>
                </div>
                <span className="text-2xl font-light text-muted">VS</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">Barcelona</span>
                   <div className="w-8 h-8 bg-red-600 rounded-full opacity-80" />
                </div>
             </div>
           </div>
           
           {/* Decorative player image placeholder */}
           <div className="absolute right-0 bottom-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        </div>

        {/* Live Games Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Live Matches</h2>
            <Link href="/live" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <LiveMatches />
        </div>

      </div>

      {/* Right Sidebar (1/3) */}
      <div className="space-y-6">
        {/* Betting Slip / Tips */}
        <BettingTips />

        {/* Mini Standings or News could go here */}
        <div className="bg-card rounded-xl border border-gray-800 p-5">
           <h3 className="text-white font-bold mb-4">Upcoming Highlights</h3>
           <div className="space-y-4">
             {[1, 2].map((i) => (
               <div key={i} className="flex gap-3">
                 <Skeleton className="w-16 h-10 rounded" />
                 <div>
                   <Skeleton className="w-32 h-4 mb-2" />
                   <Skeleton className="w-20 h-3" />
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
