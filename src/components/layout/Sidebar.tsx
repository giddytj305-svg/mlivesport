"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Search, Newspaper, Zap, Menu } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Live Scores", href: "/live", icon: Zap },
  { name: "Premier League", href: "/leagues/epl", icon: Trophy },
  { name: "La Liga", href: "/leagues/laliga", icon: Trophy },
  { name: "Bundesliga", href: "/leagues/bundesliga", icon: Trophy },
  { name: "Serie A", href: "/leagues/seriea", icon: Trophy },
  { name: "UCL", href: "/leagues/ucl", icon: Trophy },
  { name: "News", href: "/news", icon: Newspaper },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-md text-white"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Container */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-gray-800 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center h-16 px-6 border-b border-gray-800">
          <span className="text-2xl font-bold tracking-wider text-white">
            RETINA<span className="text-primary">.</span>
          </span>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Search Box */}
          <div className="mb-6 relative">
            <Link href="/search" className="flex items-center w-full px-4 py-3 text-sm text-muted bg-secondary rounded-lg hover:text-white transition-colors">
              <Search size={16} className="mr-3" />
              <span>Search...</span>
            </Link>
          </div>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-2">Menu</div>
          
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-4 border-primary" 
                    : "text-muted hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={clsx("mr-3", isActive && "text-primary")} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
