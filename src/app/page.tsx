"use client";
import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

const FEATURES = [
  { icon: "🤖", title: "Multi-Agent System", desc: "Specialist agents for research, building, optimization, and learning. Coordinated by a central hub.", tag: "Core" },
  { icon: "⚡", title: "Smart Model Routing", desc: "Auto-switches between Groq, OpenRouter, and paid models. Free first, paid only for complex tasks.", tag: "AI" },
  { icon: "🐙", title: "GitHub Integration", desc: "Push code, manage repos, create releases, and handle CI/CD — all autonomous.", tag: "DevOps" },
  { icon: "🗄️", title: "Database Management", desc: "Supabase-powered Postgres with migrations, RLS policies, and real-time subscriptions.", tag: "Data" },
  { icon: "📧", title: "Email Automation", desc: "Transactional emails via Resend. Welcome flows, order confirmations, subscription updates.", tag: "Comms" },
  { icon: "📊", title: "Analytics & Monitoring", desc: "PostHog analytics, Sentry error tracking, and Upstash Redis caching out of the box.", tag: "Ops" },
  { icon: "🔒", title: "Security First", desc: "Encrypted secrets, API key rotation, and role-based access control built in.", tag: "Security" },
  { icon: "🌐", title: "Multi-Channel", desc: "WhatsApp, Telegram, web chat, and API access. Talk to Nox from anywhere.", tag: "Access" },
  { icon: "🔄", title: "Auto-Recovery", desc: "Model failover, rate limit handling, and self-healing infrastructure.", tag: "Reliability" },
];

const STEPS = [
  { num: "01", title: "You Send a Task", desc: "Message Nox via WhatsApp, Telegram, or web. Just describe what you need in plain English." },
  { num: "02", title: "Hub Analyzes & Routes", desc: "The coordinator agent breaks down the task and routes it to the right specialist agents." },
  { num: "03", title: "Agents Execute in Parallel", desc: "Research, build, optimize — agents work simultaneously using free-tier AI models." },
  { num: "04", title: "You Get Results", desc: "Clear reports, live code, deployed services, and push notifications. No babysitting." },
];

const INTEGRATIONS = [
  { name: "Groq", color: "#F55036" },
  { name: "OpenRouter", color: "#7C3AED" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "GitHub", color: "#fff" },
  { name: "Vercel", color: "#fff" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Resend", color: "#000" },
  { name: "PostHog", color: "#1D4AFF" },
  { name: "Sentry", color: "#362D59" },
  { name: "Redis", color: "#DC382D" },
  { name: "Cloudflare", color: "#F48120" },
  { name: "WhatsApp", color: "#25D366" },
  { name: "Telegram", color: "#0088CC" },
  { name: "Docker", color: "#2496ED" },
];

const STATS = [
  { value: "99.9%", label: "Uptime" },
  { value: "<2s", label: "Response Time" },
  { value: "14+", label: "Integrations" },
  { value: "£0", label: "To Start" },
];

const TESTIMONIALS = [
  { name: "Alex R.", role: "Solo Founder", text: "Nox handles my entire backend — databases, deploys, emails. I focus on product, it handles everything else.", avatar: "A" },
  { name: "Sarah K.", role: "Agency Owner", text: "We replaced 3 tools with Nox. The smart routing alone saves us £200/mo on AI costs.", avatar: "S" },
  { name: "Marcus T.", role: "Developer", text: "The GitHub integration is insane. I describe what I want, Nox builds it, pushes it, deploys it. Magic.", avatar: "M" },
];

const TIERS = [
  { name: "Starter", price: "Free", desc: "For personal projects", features: ["1 agent", "Groq models", "GitHub integration", "Community support", "Basic analytics"], cta: "Start Free", hot: false },
  { name: "Pro", price: "£29", period: "/mo", desc: "For growing teams", features: ["5 agents", "All AI models", "Priority routing", "Database + email", "Full analytics", "Priority support", "Custom integrations"], cta: "Go Pro", hot: true },
  { name: "Enterprise", price: "Custom", desc: "For scaling operations", features: ["Unlimited agents", "Custom models", "Dedicated support", "SLA guarantee", "On-prem deployment", "Custom training", "White-label option"], cta: "Contact Us", hot: false },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen grid-bg">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-nox-600 flex items-center justify-center font-bold text-sm">N</div>
            <span className="font-bold text-white">Nox AI</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-nox-300 hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="#pricing" className="px-4 py-2 text-sm text-nox-300 hover:text-white transition-colors">Log In</a>
            <a href="#pricing" className="px-5 py-2 bg-nox-600 hover:bg-nox-500 rounded-lg text-sm text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(68,68,255,0.3)]">Get Started</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-nox-300 text-xl">☰</button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-nox-300 hover:text-white">{l.label}</a>
            ))}
            <a href="#pricing" className="block py-2 text-nox-300">Log In</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nox-900/40 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-nox-600/5 blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto animate-slide-up">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nox-700/40 bg-nox-950/50 text-sm text-nox-300">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Now in public beta
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight">
            Your AI<br />Command Center
          </h1>
          <p className="text-lg md:text-xl text-nox-200/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Autonomous agents that research, build, optimize, and learn — coordinated by one hub. Deploy in minutes, scale to millions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="px-8 py-4 bg-nox-600 hover:bg-nox-500 rounded-xl text-white font-semibold text-lg transition-all hover:shadow-[0_0_40px_rgba(68,68,255,0.4)] animate-glow">
              Start Building Free →
            </a>
            <a href="#how" className="px-8 py-4 border border-nox-700/50 hover:border-nox-500 rounded-xl text-nox-200 font-semibold transition-all hover:bg-nox-950/50">
              Watch Demo
            </a>
          </div>
        </div>
        {/* Stats bar */}
        <div className="relative z-10 mt-20 w-full max-w-3xl">
          <div className="glass rounded-2xl px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-nox-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm text-nox-400 font-semibold tracking-widest uppercase mb-3">Features</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Everything you need</h2>
            <p className="text-nox-300/50 max-w-xl mx-auto">One system replaces your entire AI infrastructure. No config, no babysitting.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-nox-800/40 bg-nox-950/20 hover:border-nox-600/40 transition-all hover:bg-nox-950/50 hover:shadow-[0_0_30px_rgba(68,68,255,0.08)]">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-[10px] px-2 py-1 rounded-full border border-nox-800/50 text-nox-500 font-mono">{f.tag}</span>
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-nox-300 transition-colors">{f.title}</h3>
                <p className="text-sm text-nox-300/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nox-900/20 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="text-sm text-nox-400 font-semibold tracking-widest uppercase mb-3">How It Works</div>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text">Four steps. Zero effort.</h2>
          </div>
          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-nox-700/20 border border-nox-600/20 flex items-center justify-center text-nox-400 font-mono font-bold text-lg group-hover:bg-nox-600/30 group-hover:border-nox-500/30 transition-all">{s.num}</div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">{s.title}</h3>
                  <p className="text-nox-300/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm text-nox-400 font-semibold tracking-widest uppercase mb-3">Integrations</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Connects to everything</h2>
            <p className="text-nox-300/50">14+ services. One config file. Automatic failover.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {INTEGRATIONS.map((int, i) => (
              <div key={i} className="px-5 py-3 rounded-xl border border-nox-800/40 bg-nox-950/30 hover:border-nox-600/40 transition-all flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: int.color }} />
                <span className="text-sm text-nox-200 font-medium">{int.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nox-900/20 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="text-sm text-nox-400 font-semibold tracking-widest uppercase mb-3">Testimonials</div>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text">Loved by builders</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-nox-800/40 bg-nox-950/30">
                <p className="text-nox-200/70 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-nox-700/40 flex items-center justify-center text-nox-300 font-bold text-sm">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-nox-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm text-nox-400 font-semibold tracking-widest uppercase mb-3">Pricing</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Start free. Scale when ready.</h2>
            <p className="text-nox-300/50">No credit card. No commitment. Just results.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {TIERS.map((t, i) => (
              <div key={i} className={`p-8 rounded-2xl border transition-all ${t.hot ? "border-nox-500 bg-nox-950/60 shadow-[0_0_60px_rgba(68,68,255,0.15)] scale-[1.02]" : "border-nox-800/40 bg-nox-950/30 hover:border-nox-700/40"}`}>
                {t.hot && <div className="text-xs text-nox-300 font-semibold mb-3 flex items-center gap-1.5">🔥 Most Popular</div>}
                <h3 className="text-lg font-semibold text-white mb-1">{t.name}</h3>
                <p className="text-nox-400 text-sm mb-4">{t.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{t.price}</span>
                  {t.period && <span className="text-nox-400">{t.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-nox-200/70">
                      <span className="text-green-400 text-xs">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-xl font-semibold transition-all ${t.hot ? "bg-nox-600 hover:bg-nox-500 text-white hover:shadow-[0_0_30px_rgba(68,68,255,0.3)]" : "border border-nox-700/50 hover:border-nox-500 text-nox-200 hover:bg-nox-950/50"}`}>
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nox-600/10 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Ready to automate?</h2>
          <p className="text-nox-300/50 mb-10 text-lg">Deploy your AI command center in minutes. No credit card required.</p>
          <a href="#pricing" className="inline-block px-10 py-4 bg-nox-600 hover:bg-nox-500 rounded-xl text-white font-semibold text-lg transition-all hover:shadow-[0_0_50px_rgba(68,68,255,0.4)] animate-glow">
            Launch Nox AI →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-nox-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-nox-600 flex items-center justify-center font-bold text-sm">N</div>
                <span className="font-bold text-white">Nox AI</span>
              </div>
              <p className="text-sm text-nox-500">Your AI command center. Autonomous agents, one hub.</p>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-3">Product</div>
              <div className="space-y-2">
                {["Features", "Pricing", "Integrations", "Changelog"].map((l) => (
                  <a key={l} href="#" className="block text-sm text-nox-500 hover:text-nox-300 transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-3">Resources</div>
              <div className="space-y-2">
                {["Documentation", "API Reference", "Blog", "Status"].map((l) => (
                  <a key={l} href="#" className="block text-sm text-nox-500 hover:text-nox-300 transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-3">Company</div>
              <div className="space-y-2">
                {["About", "Careers", "Privacy", "Terms"].map((l) => (
                  <a key={l} href="#" className="block text-sm text-nox-500 hover:text-nox-300 transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-nox-900/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-nox-600 text-sm">© 2026 Nox AI. All rights reserved.</div>
            <div className="flex gap-4">
              {["Twitter", "GitHub", "Discord"].map((s) => (
                <a key={s} href="#" className="text-nox-600 hover:text-nox-400 text-sm transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Chat */}
      <ChatInterface />
    </main>
  );
}
