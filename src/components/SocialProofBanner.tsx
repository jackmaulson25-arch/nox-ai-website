"use client";
import { useState, useEffect } from "react";

export default function SocialProofBanner() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate growing user count
    const base = 847;
    const growth = Math.floor(Date.now() / 100000) % 200;
    setCount(base + growth);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs">
      <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 animate-slide-up">
        <div className="flex -space-x-2">
          {["A", "S", "M", "J"].map((l, i) => (
            <div key={i} className="w-7 h-7 rounded-full bg-nox-700/40 border-2 border-nox-950 flex items-center justify-center text-[10px] text-nox-300 font-bold">{l}</div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-white font-medium">{count}+ builders using Nox</div>
          <div className="text-[10px] text-nox-500">Join them — it&apos;s free</div>
        </div>
        <button onClick={() => setVisible(false)} className="text-nox-600 hover:text-nox-400 text-xs">✕</button>
      </div>
    </div>
  );
}
