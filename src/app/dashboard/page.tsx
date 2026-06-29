import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user.user_metadata?.full_name || user.email?.split("@")[0]} 👋</h2>
        <p className="text-nox-400">Here&apos;s what&apos;s happening with your AI command center.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Agents", value: "4/4", icon: "🤖", color: "green" },
          { label: "Tasks Today", value: "12", icon: "📋", color: "blue" },
          { label: "Tokens Saved", value: "847K", icon: "⚡", color: "yellow" },
          { label: "Uptime", value: "99.9%", icon: "🟢", color: "green" },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-nox-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "Builder agent deployed prestige-slims", time: "2 min ago", status: "✅" },
              { action: "Researcher completed market analysis", time: "15 min ago", status: "✅" },
              { action: "Optimizer ran performance audit", time: "1 hour ago", status: "✅" },
              { action: "Learner consolidated memory patterns", time: "3 hours ago", status: "✅" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-nox-800/20 last:border-0">
                <span>{a.status}</span>
                <div className="flex-1">
                  <div className="text-sm text-nox-200">{a.action}</div>
                  <div className="text-xs text-nox-500">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Agent Status</h3>
          <div className="space-y-3">
            {[
              { name: "Hub", model: "mimo-v2.5-pro", status: "online", role: "Coordinator" },
              { name: "Researcher", model: "Groq Llama 3.3", status: "online", role: "Web research" },
              { name: "Builder", model: "Groq Llama 3.3", status: "online", role: "Code & deploy" },
              { name: "Optimizer", model: "Groq Llama 3.3", status: "online", role: "Validation" },
            ].map((agent, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-nox-800/20 last:border-0">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <div className="flex-1">
                  <div className="text-sm text-white font-medium">{agent.name}</div>
                  <div className="text-xs text-nox-500">{agent.role} • {agent.model}</div>
                </div>
                <span className="text-xs text-green-400">{agent.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
