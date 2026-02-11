import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Retina Sports | Live Football Scores",
  description: "Live scores, stats, and betting tips.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex bg-background`}>
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* Header Area */}
          <header className="sticky top-0 z-30 flex items-center justify-end px-8 h-16 bg-background/95 backdrop-blur border-b border-gray-800 lg:px-12">
            <div className="flex items-center space-x-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted">Balance</p>
                <p className="text-sm font-bold text-primary">1,000 $</p>
              </div>
              <button className="px-4 py-2 text-sm font-bold text-black bg-primary rounded-md hover:bg-primary-hover transition">
                Add Tips
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                {/* User Avatar Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700" />
              </div>
            </div>
          </header>
          
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
