"use client";
import { useState, useEffect } from "react";

const LINES = [
  { text: "$ nox deploy prestige-slims", delay: 0, color: "text-green-400" },
  { text: "→ Routing to builder agent (Groq Llama 3.3 70B)", delay: 800, color: "text-nox-300" },
  { text: "→ Building Next.js production bundle...", delay: 1600, color: "text-nox-300" },
  { text: "✓ Build complete (4.2s)", delay: 2400, color: "text-green-400" },
  { text: "→ Deploying to Vercel...", delay: 3000, color: "text-nox-300" },
  { text: "✓ Live at https://prestige-slims.vercel.app", delay: 3800, color: "text-green-400" },
  { text: "→ Running health checks...", delay: 4400, color: "text-nox-300" },
  { text: "✓ All systems operational", delay: 5000, color: "text-green-400" },
  { text: "", delay: 5600, color: "text-nox-500" },
  { text: "$ nox status", delay: 6200, color: "text-green-400" },
  { text: "Agents: 4/4 online │ Models: Groq + OpenRouter │ Uptime: 99.9%", delay: 7000, color: "text-nox-200" },
];

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });
    const loop = setTimeout(() => setVisibleLines(0), 12000);
    timers.push(loop);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (visibleLines === 0 && LINES.length > 0) {
      const restart = setTimeout(() => {
        LINES.forEach((line, i) => {
          setTimeout(() => setVisibleLines(i + 1), line.delay);
        });
      }, 1000);
      return () => clearTimeout(restart);
    }
  }, [visibleLines]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-nox-800/40 bg-[#0a0a1a] shadow-[0_0_60px_rgba(68,68,255,0.1)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-nox-950/80 border-b border-nox-800/30">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-nox-600 font-mono">nox-terminal</span>
      </div>
      {/* Content */}
      <div className="p-5 font-mono text-sm min-h-[280px]">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${line.color} ${i === visibleLines - 1 ? "animate-pulse" : ""} mb-1`}>
            {line.text}
            {i === visibleLines - 1 && <span className="ml-1 inline-block w-2 h-4 bg-green-400 animate-pulse" />}
          </div>
        ))}
      </div>
    </div>
  );
}
