"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "Agents", href: "/dashboard/agents", icon: "🤖" },
  { label: "Tasks", href: "/dashboard/tasks", icon: "📋" },
  { label: "Power Node", href: "/dashboard/power-node", icon: "⚡" },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: "🏆" },
  { label: "Billing", href: "/dashboard/billing", icon: "💳" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string; avatar_url?: string } } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-nox-950/80 backdrop-blur-xl border-r border-nox-800/30 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-nox-800/30">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-nox-600 flex items-center justify-center font-bold text-sm">N</div>
            <span className="font-bold text-white">Nox AI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                pathname === item.href
                  ? "bg-nox-600/20 text-white border border-nox-600/30"
                  : "text-nox-400 hover:text-white hover:bg-nox-900/40"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-nox-800/30">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-nox-700/40 flex items-center justify-center text-xs font-bold text-nox-300">
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium truncate">{user?.user_metadata?.full_name || "User"}</div>
              <div className="text-xs text-nox-500 truncate">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-nox-500 hover:text-red-400 transition-colors rounded-xl hover:bg-nox-900/40">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-nox-800/30 bg-nox-950/50 backdrop-blur-xl flex items-center px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-nox-400 mr-4 text-xl">☰</button>
          <h1 className="text-lg font-semibold text-white">{NAV.find((n) => n.href === pathname)?.label || "Dashboard"}</h1>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
