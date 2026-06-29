export default function AgentsPage() {
  const agents = [
    { name: "Hub", model: "mimo-v2.5-pro", status: "online", tasks: 156, role: "Central coordinator", uptime: "99.9%", tokens: "2.1M" },
    { name: "Researcher", model: "Groq Llama 3.3 70B", status: "online", tasks: 89, role: "Web research & analysis", uptime: "99.7%", tokens: "847K" },
    { name: "Builder", model: "Groq Llama 3.3 70B", status: "online", tasks: 234, role: "Code, deploy, configure", uptime: "99.8%", tokens: "1.2M" },
    { name: "Optimizer", model: "Groq Llama 3.3 70B", status: "online", tasks: 67, role: "Validation & testing", uptime: "99.9%", tokens: "423K" },
    { name: "Learner", model: "Groq Gemma 2 9B", status: "online", tasks: 45, role: "Memory consolidation", uptime: "100%", tokens: "156K" },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Agent Fleet</h2>
          <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">All Online</span>
        </div>
        <div className="space-y-4">
          {agents.map((agent, i) => (
            <div key={i} className="p-5 rounded-xl border border-nox-800/30 bg-nox-950/30 hover:border-nox-600/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <div>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <p className="text-xs text-nox-500">{agent.role}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full border border-nox-800/50 text-nox-400 font-mono">{agent.model}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div><div className="text-lg font-bold text-white">{agent.tasks}</div><div className="text-xs text-nox-500">Tasks completed</div></div>
                <div><div className="text-lg font-bold text-white">{agent.uptime}</div><div className="text-xs text-nox-500">Uptime</div></div>
                <div><div className="text-lg font-bold text-white">{agent.tokens}</div><div className="text-xs text-nox-500">Tokens used</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
