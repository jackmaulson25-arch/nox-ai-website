export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nox-900/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nox-700/40 bg-nox-950/50 text-sm text-nox-300">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Multi-Agent AI System
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-nox-300 bg-clip-text text-transparent">
            Nox AI
          </h1>
          <p className="text-xl md:text-2xl text-nox-200/70 mb-8 max-w-2xl mx-auto">
            Your AI command center. Autonomous agents that research, build, optimize, and learn — so you don&apos;t have to.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#features" className="px-8 py-4 bg-nox-600 hover:bg-nox-500 rounded-xl text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(68,68,255,0.3)]">
              Get Started
            </a>
            <a href="#how-it-works" className="px-8 py-4 border border-nox-700/50 hover:border-nox-500 rounded-xl text-nox-200 font-semibold transition-all">
              How It Works
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 animate-bounce text-nox-500">↓</div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Powerful by Default</h2>
          <p className="text-nox-300/60 text-center mb-16 max-w-xl mx-auto">Everything you need to run an autonomous AI operation. No configuration required.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "Multi-Agent Orchestration", desc: "Specialist agents for research, building, optimization, and learning. Coordinated by a central hub." },
              { icon: "⚡", title: "Smart Model Routing", desc: "Auto-switches between Groq, OpenRouter, and paid models. Free first, paid only for complex tasks." },
              { icon: "🐙", title: "GitHub Integration", desc: "Push code, manage repos, create releases, and handle CI/CD — all autonomous." },
              { icon: "🗄️", title: "Database Management", desc: "Supabase-powered Postgres with migrations, RLS policies, and real-time subscriptions." },
              { icon: "📧", title: "Email Automation", desc: "Transactional emails via Resend. Welcome flows, order confirmations, subscription updates." },
              { icon: "📊", title: "Analytics & Monitoring", desc: "PostHog analytics, Sentry error tracking, and Upstash Redis caching out of the box." },
            ].map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-nox-800/50 bg-nox-950/30 hover:border-nox-600/50 transition-all hover:bg-nox-950/60">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-nox-300 transition-colors">{f.title}</h3>
                <p className="text-nox-300/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-nox-950/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "You Send a Task", desc: "Message Nox via WhatsApp, Telegram, or web. Just describe what you need." },
              { step: "02", title: "Hub Routes It", desc: "The central coordinator analyzes the task and routes it to the right specialist agent." },
              { step: "03", title: "Agents Execute", desc: "Research, build, optimize — agents work in parallel using free-tier AI models." },
              { step: "04", title: "You Get Results", desc: "Clear reports, live code, deployed services. No babysitting required." },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-nox-700/30 border border-nox-600/30 flex items-center justify-center text-nox-400 font-mono font-bold">{s.step}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{s.title}</h3>
                  <p className="text-nox-300/60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-nox-300/60 text-center mb-16">Start free. Scale when you&apos;re ready.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "Free", desc: "For personal use", features: ["1 agent", "Groq models", "GitHub integration", "Community support"], cta: "Start Free", highlight: false },
              { name: "Pro", price: "£29/mo", desc: "For small teams", features: ["5 agents", "All AI models", "Priority routing", "Database + email", "Analytics", "Priority support"], cta: "Go Pro", highlight: true },
              { name: "Enterprise", price: "Custom", desc: "For scaling operations", features: ["Unlimited agents", "Custom models", "Dedicated support", "SLA guarantee", "On-prem option"], cta: "Contact Us", highlight: false },
            ].map((p, i) => (
              <div key={i} className={`p-8 rounded-2xl border ${p.highlight ? "border-nox-500 bg-nox-950/60 shadow-[0_0_40px_rgba(68,68,255,0.15)]" : "border-nox-800/50 bg-nox-950/30"} transition-all`}>
                <h3 className="text-lg font-semibold text-white mb-1">{p.name}</h3>
                <p className="text-nox-300/60 text-sm mb-4">{p.desc}</p>
                <div className="text-3xl font-bold text-white mb-6">{p.price}</div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-nox-200/70">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${p.highlight ? "bg-nox-600 hover:bg-nox-500 text-white" : "border border-nox-700/50 hover:border-nox-500 text-nox-200"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to automate?</h2>
          <p className="text-nox-300/60 mb-8">Deploy your AI command center in minutes. No credit card required.</p>
          <a href="#" className="inline-block px-10 py-4 bg-nox-600 hover:bg-nox-500 rounded-xl text-white font-semibold text-lg transition-all hover:shadow-[0_0_40px_rgba(68,68,255,0.3)]">
            Launch Nox AI →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-nox-900/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-nox-400 font-semibold">Nox AI</div>
          <div className="text-nox-500 text-sm">© 2026 Nox AI. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
