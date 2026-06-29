"use client";
import Link from "next/link";

const TOP_FOUNDERS = [
  { rank: 1, name: "Alex R.", badge: "🔥", tier: "OG Founder", points: 128450, story: "Built my entire SaaS with Nox. Now I contribute back.", avatar: "A" },
  { rank: 2, name: "Sarah K.", badge: "👑", tier: "Legend", points: 87200, story: "Agency owner. Nox handles 80% of our backend work.", avatar: "S" },
  { rank: 3, name: "Marcus T.", badge: "👑", tier: "Legend", points: 72100, story: "Full-stack dev. I code by day, Nox codes by night.", avatar: "M" },
  { rank: 4, name: "Jordan P.", badge: "🏆", tier: "Champion", points: 34500, story: "Running a Nox node on my gaming rig.", avatar: "J" },
  { rank: 5, name: "Emma L.", badge: "🏆", tier: "Champion", points: 28900, story: "Student developer. Nox helps me learn and contribute.", avatar: "E" },
];

export default function PublicLeaderboard() {
  return (
    <main className="min-h-screen grid-bg">
      <nav className="fixed top-0 w-full z-40 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-nox-600 flex items-center justify-center font-bold text-sm">N</div>
            <span className="font-bold text-white">Nox AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="px-4 py-2 text-sm text-nox-300 hover:text-white">Log In</Link>
            <Link href="/auth/signup" className="px-5 py-2 bg-nox-600 hover:bg-nox-500 rounded-lg text-sm text-white font-semibold transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Nox Founders</h1>
            <p className="text-nox-400 max-w-xl mx-auto">The people powering the distributed AI network. Contribute compute, earn rewards, build the future.</p>
          </div>

          {/* Top 3 */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {TOP_FOUNDERS.slice(0, 3).map((user, i) => (
              <div key={i} className={`glass rounded-2xl p-6 text-center ${i === 0 ? "md:order-2 scale-105 border-nox-500/30" : i === 1 ? "md:order-1" : "md:order-3"}`}>
                <div className="text-4xl mb-3">{user.badge}</div>
                <div className="w-16 h-16 rounded-full bg-nox-700/40 flex items-center justify-center text-xl font-bold text-white mx-auto mb-3">{user.avatar}</div>
                <div className="font-bold text-white text-lg">{user.name}</div>
                <div className="text-sm text-nox-400 mb-2">{user.tier}</div>
                <div className="text-3xl font-bold text-white mb-1">{user.points.toLocaleString()}</div>
                <div className="text-xs text-nox-500 mb-3">contribution points</div>
                <div className="text-sm text-nox-300 italic">&ldquo;{user.story}&rdquo;</div>
              </div>
            ))}
          </div>

          {/* Rest */}
          <div className="space-y-3 mb-12">
            {TOP_FOUNDERS.slice(3).map((user, i) => (
              <div key={i} className="glass rounded-xl p-5 flex items-center gap-4">
                <div className="w-8 text-center font-mono text-nox-500">#{user.rank}</div>
                <span className="text-2xl">{user.badge}</span>
                <div className="w-10 h-10 rounded-full bg-nox-700/40 flex items-center justify-center text-sm font-bold text-nox-300">{user.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-nox-500">{user.story}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{user.points.toLocaleString()}</div>
                  <div className="text-xs text-nox-500">points</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="glass rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Become a Founder</h2>
            <p className="text-nox-400 mb-6">Share your spare compute power. Get discounts, badges, and join the leaderboard.</p>
            <div className="flex justify-center gap-4">
              <Link href="/auth/signup" className="px-8 py-3 bg-nox-600 hover:bg-nox-500 rounded-xl text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(68,68,255,0.3)]">
                Join Nox AI →
              </Link>
              <Link href="/#features" className="px-8 py-3 border border-nox-700/50 hover:border-nox-500 rounded-xl text-nox-200 font-semibold transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
