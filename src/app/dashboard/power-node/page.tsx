"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const FOUNDER_TIERS = [
  { name: "Supporter", points: "0+", discount: "5%", badge: "🤝", color: "text-gray-400", perks: "5% discount, community access" },
  { name: "Contributor", points: "1,000+", discount: "10%", badge: "⚡", color: "text-blue-400", perks: "10% discount, priority support, founder badge" },
  { name: "Champion", points: "5,000+", discount: "20%", badge: "🏆", color: "text-purple-400", perks: "20% discount, early access, leaderboard featured" },
  { name: "Legend", points: "25,000+", discount: "35%", badge: "👑", color: "text-yellow-400", perks: "35% discount, custom features, direct team access" },
  { name: "OG Founder", points: "100,000+", discount: "50%", badge: "🔥", color: "text-red-400", perks: "50% discount, lifetime access, name in credits" },
];

export default function PowerNodePage() {
  const [enabled, setEnabled] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [stats, setStats] = useState({ hours: 0, tasks: 0, points: 0, rank: "Supporter" });

  const handleToggle = () => {
    if (!enabled && !nodeName) {
      setNodeName(`nox-node-${Math.random().toString(36).slice(2, 8)}`);
    }
    setEnabled(!enabled);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Hero */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-nox-600/10 rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">⚡ Power Node</h2>
          <p className="text-nox-400 mb-6">Share your spare computing power with the Nox network. Get discounts, badges, and climb the leaderboard.</p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleToggle}
              className={`relative w-16 h-8 rounded-full transition-all ${enabled ? "bg-green-500" : "bg-nox-700/40"}`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${enabled ? "left-9" : "left-1"}`} />
            </button>
            <div>
              <div className="text-sm font-semibold text-white">{enabled ? "Node Active" : "Node Inactive"}</div>
              <div className="text-xs text-nox-500">{enabled ? "Your node is contributing to the network" : "Toggle to start earning rewards"}</div>
            </div>
          </div>

          {enabled && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Compute Hours", value: stats.hours, icon: "⏱️" },
                { label: "Tasks Processed", value: stats.tasks, icon: "📋" },
                { label: "Contribution Points", value: stats.points.toLocaleString(), icon: "⭐" },
                { label: "Current Rank", value: stats.rank, icon: "🏅" },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl border border-nox-800/30 bg-nox-950/30">
                  <span className="text-xl">{s.icon}</span>
                  <div className="text-xl font-bold text-white mt-2">{s.value}</div>
                  <div className="text-xs text-nox-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* How it works */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Enable Your Node", desc: "One toggle. Nox deploys a lightweight compute node on your machine." },
            { step: "2", title: "Contribute Power", desc: "Your spare CPU/GPU helps process AI tasks for the network when idle." },
            { step: "3", title: "Earn Rewards", desc: "Every task earns points. More points = bigger discounts + exclusive badges." },
          ].map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-nox-600/20 border border-nox-600/30 flex items-center justify-center text-nox-400 font-bold flex-shrink-0">{s.step}</div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">{s.title}</div>
                <div className="text-xs text-nox-500 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Tiers */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-2">Founder Tiers</h3>
        <p className="text-sm text-nox-500 mb-6">The more you contribute, the more you save. Founders get lifetime benefits.</p>
        <div className="space-y-3">
          {FOUNDER_TIERS.map((tier, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-nox-800/20 bg-nox-950/20 hover:border-nox-700/30 transition-all">
              <span className="text-2xl">{tier.badge}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${tier.color}`}>{tier.name}</span>
                  <span className="text-xs text-nox-600">•</span>
                  <span className="text-xs text-nox-500">{tier.points} points</span>
                </div>
                <div className="text-xs text-nox-500 mt-1">{tier.perks}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">{tier.discount}</div>
                <div className="text-xs text-nox-500">off</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to become a Founder?</h3>
        <p className="text-sm text-nox-500 mb-6">Enable your node and start earning. The earlier you join, the more founder status means.</p>
        <div className="flex justify-center gap-4">
          <button onClick={handleToggle} className="px-8 py-3 bg-nox-600 hover:bg-nox-500 rounded-xl text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(68,68,255,0.3)]">
            {enabled ? "Node Active ✓" : "Enable Power Node"}
          </button>
          <Link href="/dashboard/leaderboard" className="px-8 py-3 border border-nox-700/50 hover:border-nox-500 rounded-xl text-nox-200 font-semibold transition-all">
            View Leaderboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
