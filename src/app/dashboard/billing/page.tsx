"use client";
import { useState } from "react";

const TIERS = [
  { name: "Free Trial", price: "£0", period: "", desc: "Try Nox risk-free", features: ["1 agent", "Groq models only", "100 tasks/day", "Community support"], priceId: null, current: true },
  { name: "Standard", price: "£9", period: "/mo", desc: "For side projects", features: ["2 agents", "Groq + OpenRouter", "500 tasks/day", "Email support", "Basic analytics"], priceId: "price_standard" },
  { name: "Pro", price: "£29", period: "/mo", desc: "For growing teams", features: ["5 agents", "All AI models", "Unlimited tasks", "Priority support", "Full analytics", "Custom integrations"], priceId: "price_pro" },
  { name: "Max", price: "£79", period: "/mo", desc: "For scaling operations", features: ["Unlimited agents", "All AI models", "Dedicated support", "SLA guarantee", "On-prem option", "White-label", "Custom training"], priceId: "price_max" },
];

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) return;
    setLoading(priceId);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(null);
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Billing</h2>
        <p className="text-nox-400 text-sm mb-6">Manage your subscription and billing.</p>

        <div className="mb-6 p-4 rounded-xl border border-nox-600/30 bg-nox-600/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Current Plan: Free Trial</div>
              <div className="text-xs text-nox-400">1 agent, 100 tasks/day</div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Active</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {TIERS.map((tier, i) => (
            <div key={i} className={`p-6 rounded-xl border transition-all ${tier.current ? "border-green-500/30 bg-green-500/5" : "border-nox-800/30 bg-nox-950/30 hover:border-nox-600/30"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white">{tier.name}</h3>
                  <p className="text-xs text-nox-500">{tier.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-nox-400 text-sm">{tier.period}</span>}
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-nox-300/70">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              {tier.current ? (
                <div className="text-xs text-green-400 text-center py-2">Current Plan</div>
              ) : (
                <button
                  onClick={() => handleCheckout(tier.priceId)}
                  disabled={loading === tier.priceId}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all bg-nox-600 hover:bg-nox-500 text-white disabled:opacity-50"
                >
                  {loading === tier.priceId ? "Loading..." : `Upgrade to ${tier.name}`}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
