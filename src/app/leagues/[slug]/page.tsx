"use client";
import { useState } from "react";
import useSWR from "swr";
import { fetchAPI } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";
import { notFound } from "next/navigation";

// Map slugs to API prefixes
const LEAGUE_MAP: Record<string, string> = {
  epl: "epl",
  laliga: "laliga",
  bundesliga: "bundesliga",
  seriea: "seriea",
  ligue1: "ligue1",
  ucl: "ucl",
};

interface PageProps {
  params: { slug: string };
}

export default function LeaguePage({ params }: PageProps) {
  const { slug } = params;
  const apiPrefix = LEAGUE_MAP[slug];
  const [activeTab, setActiveTab] = useState("matches");

  if (!apiPrefix) notFound();

  // Dynamic Endpoint construction
  const endpoint = `/${apiPrefix}/${activeTab}`;
  
  const { data, isLoading, error } = useSWR(endpoint, fetchAPI);

  const tabs = [
    { id: "matches", label: "Matches" },
    { id: "standings", label: "Standings" },
    { id: "scorers", label: "Top Scorers" },
    { id: "upcomingmatches", label: "Upcoming" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider">{slug}</h1>
        <p className="text-muted">Season 2024-2025</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-secondary text-primary border-b-2 border-primary"
                : "text-muted hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-card rounded-xl border border-gray-800 p-6 min-h-[400px]">
        {isLoading && (
          <div className="space-y-4">
             <Skeleton className="w-full h-12" />
             <Skeleton className="w-full h-12" />
             <Skeleton className="w-full h-12" />
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-muted">Could not load data for this section.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-primary hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && data && (
          <div className="overflow-x-auto">
             <pre className="text-xs text-gray-400 whitespace-pre-wrap">
               {/* 
                 For production, you would create specific components 
                 (Table, MatchList) here depending on activeTab.
                 For now, we dump the JSON securely.
               */}
               {JSON.stringify(data, null, 2)}
             </pre>
          </div>
        )}
      </div>
    </div>
  );
}
