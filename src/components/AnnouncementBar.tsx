"use client";
import { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  "🚀 Nox AI is live — deploy your AI command center in minutes",
  "⚡ Smart routing now saves 60% on AI costs with free-tier models",
  "🆕 New: Real-time chat interface with multi-agent coordination",
  "💰 Free tier available — no credit card required",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % ANNOUNCEMENTS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-16 w-full z-30 bg-nox-600/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-center">
        <div className="flex-1 text-center">
          <span className="text-sm text-white font-medium animate-slide-up" key={current}>{ANNOUNCEMENTS[current]}</span>
        </div>
        <button onClick={() => setVisible(false)} className="text-white/60 hover:text-white text-sm ml-4">✕</button>
      </div>
    </div>
  );
}
