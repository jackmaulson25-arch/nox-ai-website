"use client";
import { useState } from "react";

export default function WaitlistSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setError(data.error || "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/20">
        <span className="text-green-400 text-lg">✓</span>
        <div>
          <div className="text-sm font-semibold text-green-300">You&apos;re on the list!</div>
          <div className="text-xs text-green-400/60">We&apos;ll notify you when we launch.</div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 bg-nox-900/40 border border-nox-800/30 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-nox-500 focus:outline-none focus:border-nox-500 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3.5 bg-nox-600 hover:bg-nox-500 disabled:opacity-50 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(68,68,255,0.3)] whitespace-nowrap"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
