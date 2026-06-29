"use client";
import Link from "next/link";

const LEADERBOARD = [
  { rank: 1, name: "Alex R.", badge: "🔥", tier: "OG Founder", points: 128450, hours: 2340, tasks: 8923, story: "Built my entire SaaS with Nox. Now I contribute back.", avatar: "A" },
  { rank: 2, name: "Sarah K.", badge: "👑", tier: "Legend", points: 87200, hours: 1560, tasks: 6234, story: "Agency owner. Nox handles 80% of our backend work.", avatar: "S" },
  { rank: 3, name: "Marcus T.", badge: "👑", tier: "Legend", points: 72100, hours: 1280, tasks: 5102, story: "Full-stack dev. I code by day, Nox codes by night.", avatar: "M" },
  { rank: 4, name: "Jordan P.", badge: "🏆", tier: "Champion", points: 34500, hours: 890, tasks: 3456, story: "Running a Nox node on my gaming rig. Free time = free compute.", avatar: "J" },
  { rank: 5, name: "Emma L.", badge: "🏆", tier: "Champion", points: 28900, hours: 720, tasks: 2890, story: "Student developer. Nox helps me learn and contribute.", avatar: "E" },
  { rank: 6, name: "David C.", badge: "⚡", tier: "Contributor", points: 15600, hours: 450, tasks: 1890, story: "Switched from Zapier to Nox. Never looked back.", avatar: "D" },
  { rank: 7, name: "Priya M.", badge: "⚡", tier: "Contributor", points: 12300, hours: 380, tasks: 1560, story: "My node runs 24/7 on a Raspberry Pi cluster.", avatar: "P" },
  { rank: 8, name: "Tom W.", badge: "⚡", tier: "Contributor", points: 8900, hours: 290, tasks: 1230, story: "Contributing since day one. The discount pays for itself.", avatar: "T" },
  { rank: 9, name: "Lisa R.", badge: "🤝", tier: "Supporter", points: 4500, hours: 150, tasks: 670, story: "Small business owner. Every bit of compute helps.", avatar: "L" },
  { rank: 10, name: "Chris N.", badge: "🤝", tier: "Supporter", points: 2100, hours: 80, tasks: 340, story: "Just started. Already seeing the benefits.", avatar: "C" },
];

const TIER_COLORS: Record<string, string> = {
  "OG Founder": "border-red-500/30 bg-red-500/5",
  "Legend": "border-yellow-500/30 bg-yellow-500/5",
  "Champion": "border-purple-500/30 bg-purple-500/5",
  "Contributor": "border-blue-500/30 bg-blue-500/5",
  "Supporter": "border-gray-500/30 bg-gray-500/5",
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">🏆 Leaderboard</h2>
            <p className="text-sm text-nox-500">The people powering the Nox network</p>
          </div>
          <Link href="/dashboard/power-node" className="px-4 py-2 bg-nox-600 hover:bg-nox-500 rounded-xl text-white text-sm font-semibold transition-all">
            Join →
          </Link>
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {LEADERBOARD.slice(0, 3).map((user, i) => (
            <div key={i} className={`p-6 rounded-2xl border text-center ${TIER_COLORS[user.tier]} ${i === 0 ? "md:order-2 scale-105" : i === 1 ? "md:order-1" : "md:order-3"}`}>
              <div className="text-3xl mb-2">{user.badge}</div>
              <div className="w-14 h-14 rounded-full bg-nox-700/40 flex items-center justify-center text-lg font-bold text-white mx-auto mb-3">{user.avatar}</div>
              <div className="font-semibold text-white text-sm">{user.name}</div>
              <div className="text-xs text-nox-500 mb-2">{user.tier}</div>
              <div className="text-2xl font-bold text-white">{user.points.toLocaleString()}</div>
              <div className="text-xs text-nox-500">points</div>
              <div className="text-xs text-nox-400 mt-3 italic">&ldquo;{user.story}&rdquo;</div>
            </div>
          ))}
        </div>

        {/* Rest of leaderboard */}
        <div className="space-y-2">
          {LEADERBOARD.slice(3).map((user, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-nox-800/20 bg-nox-950/20 hover:border-nox-700/30 transition-all">
              <div className="w-8 text-center font-mono text-nox-500 text-sm">#{user.rank}</div>
              <span className="text-xl">{user.badge}</span>
              <div className="w-10 h-10 rounded-full bg-nox-700/40 flex items-center justify-center text-sm font-bold text-nox-300">{user.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{user.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-nox-800/50 text-nox-500">{user.tier}</span>
                </div>
                <div className="text-xs text-nox-500 truncate mt-1">{user.story}</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white">{user.points.toLocaleString()}</div>
                <div className="text-xs text-nox-500">{user.hours}h • {user.tasks} tasks</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Total Network Hours", value: "8,080", icon: "⏱️" },
          { label: "Tasks Distributed", value: "32,275", icon: "📋" },
          { label: "Active Nodes", value: "247", icon: "⚡" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-xl p-5 text-center">
            <span className="text-2xl">{s.icon}</span>
            <div className="text-2xl font-bold text-white mt-2">{s.value}</div>
            <div className="text-xs text-nox-500">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
