"use client";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { fetchAPI } from "@/lib/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResults(null);

    // Run searches in parallel (Promise.allSettled prevents one failure stopping others)
    const [players, teams, venues] = await Promise.allSettled([
      fetchAPI(`/sport/playersearch?q=${query}`),
      fetchAPI(`/sport/teamsearch?q=${query}`),
      fetchAPI(`/sport/venuesearch?q=${query}`),
    ]);

    setResults({
      players: players.status === 'fulfilled' ? players.value : [],
      teams: teams.status === 'fulfilled' ? teams.value : [],
      venues: venues.status === 'fulfilled' ? venues.value : [],
    });
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Search Database</h1>
      
      <form onSubmit={handleSearch} className="relative mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search players, teams, or stadiums..."
          className="w-full bg-card border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition"
        />
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
      </form>

      {loading && <div className="text-center text-primary">Searching...</div>}

      {results && (
        <div className="space-y-8">
          {/* Teams */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-gray-800 pb-2">Teams</h2>
            {results.teams && Array.isArray(results.teams) && results.teams.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {results.teams.map((team: any, i: number) => (
                   <div key={i} className="p-4 bg-card rounded-lg border border-gray-800 text-white">
                     {team.name || "Unknown Team"}
                   </div>
                 ))}
               </div>
            ) : <p className="text-muted text-sm">No teams found.</p>}
          </section>
          
          {/* Players */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-gray-800 pb-2">Players</h2>
             {results.players && Array.isArray(results.players) && results.players.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {results.players.map((p: any, i: number) => (
                   <div key={i} className="p-4 bg-card rounded-lg border border-gray-800 text-white">
                     {p.name || "Unknown Player"}
                   </div>
                 ))}
               </div>
            ) : <p className="text-muted text-sm">No players found.</p>}
          </section>
        </div>
      )}
    </div>
  );
}
