export default function TasksPage() {
  const tasks = [
    { id: "task-001", type: "deploy", description: "Deploy prestige-slims to Vercel", agent: "Builder", status: "completed", time: "2 min ago" },
    { id: "task-002", type: "research", description: "Analyze competitor pricing models", agent: "Researcher", status: "completed", time: "15 min ago" },
    { id: "task-003", type: "build", description: "Create Supabase migrations for user_subscriptions", agent: "Builder", status: "completed", time: "1 hour ago" },
    { id: "task-004", type: "optimize", description: "Run performance audit on Nox website", agent: "Optimizer", status: "completed", time: "2 hours ago" },
    { id: "task-005", type: "learn", description: "Consolidate memory patterns from today's sessions", agent: "Learner", status: "completed", time: "3 hours ago" },
    { id: "task-006", type: "build", description: "Wire Stripe checkout into prestige-slims", agent: "Builder", status: "in_progress", time: "Now" },
    { id: "task-007", type: "research", description: "Find best email templates for onboarding", agent: "Researcher", status: "queued", time: "Pending" },
  ];

  const statusColors: Record<string, string> = {
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    in_progress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    queued: "bg-nox-700/20 text-nox-400 border-nox-700/30",
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Task History</h2>
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-nox-800/20 bg-nox-950/20 hover:border-nox-700/30 transition-all">
              <div className="flex-1">
                <div className="text-sm text-white font-medium">{task.description}</div>
                <div className="text-xs text-nox-500 mt-1">{task.agent} • {task.time}</div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[task.status]}`}>{task.status.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
