"use client";
import { useState, useEffect } from "react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const url = "https://nox-website-two.vercel.app";
  const text = "Check out Nox AI — autonomous AI agents that research, build, deploy, and learn. Free to start! 🤖";

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "Nox AI", text, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const links = [
    { name: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, icon: "𝕏" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, icon: "in" },
    { name: "Reddit", href: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent("Nox AI — Your AI Command Center")}`, icon: "⬆" },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, icon: "💬" },
  ];

  return (
    <div className="flex items-center gap-3">
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-nox-800/40 bg-nox-950/30 hover:border-nox-600/40 flex items-center justify-center text-sm text-nox-300 hover:text-white transition-all" title={`Share on ${l.name}`}>
          {l.icon}
        </a>
      ))}
      <button onClick={share} className="w-10 h-10 rounded-xl border border-nox-800/40 bg-nox-950/30 hover:border-nox-600/40 flex items-center justify-center text-sm text-nox-300 hover:text-white transition-all" title="Copy link">
        {copied ? "✓" : "🔗"}
      </button>
    </div>
  );
}
