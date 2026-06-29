"use client";
import { useState, useRef, useEffect } from "react";

const MOCK_RESPONSES: Record<string, string> = {
  "hello": "Hey! I'm Nox AI. I can research, build, deploy, and manage your entire stack. What do you need?",
  "help": "I can help with:\n• Research & analysis\n• Code & deployment\n• Database management\n• Email automation\n• Analytics setup\n\nJust ask!",
  "deploy": "I can deploy your Next.js app to Vercel, manage Supabase databases, and configure CI/CD pipelines. Want me to set something up?",
  "pricing": "We offer 3 tiers:\n🟢 Starter — Free (1 agent, Groq models)\n🔵 Pro — £29/mo (5 agents, all models)\n🟣 Enterprise — Custom (unlimited agents)\n\nWhich interests you?",
  "default": "I'm processing your request. As a multi-agent system, I route tasks to specialist agents — researchers, builders, optimizers. What would you like me to work on?",
};

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "nox"; text: string; time: string }[]>([
    { role: "nox", text: "Welcome to Nox AI! I'm your autonomous command center. How can I help?", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      const response = Object.entries(MOCK_RESPONSES).find(([k]) => lower.includes(k))?.[1] || MOCK_RESPONSES.default;
      setMessages((prev) => [...prev, { role: "nox", text: response, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-nox-600 hover:bg-nox-500 text-white shadow-[0_0_30px_rgba(68,68,255,0.4)] transition-all hover:scale-110 flex items-center justify-center text-xl"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[70vh] rounded-2xl overflow-hidden flex flex-col glass animate-slide-up shadow-[0_0_60px_rgba(68,68,255,0.2)]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-nox-800/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-nox-600 flex items-center justify-center text-sm font-bold">N</div>
            <div>
              <div className="font-semibold text-white text-sm">Nox AI</div>
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-nox-600 text-white rounded-br-md"
                    : "bg-nox-900/60 text-nox-100 rounded-bl-md border border-nox-800/30"
                }`}>
                  {m.text}
                  <div className={`text-[10px] mt-1 ${m.role === "user" ? "text-nox-300" : "text-nox-500"}`}>{m.time}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-nox-900/60 border border-nox-800/30 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-nox-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-nox-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-nox-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-nox-800/50">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask Nox anything..."
                className="flex-1 bg-nox-900/40 border border-nox-800/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-nox-500 focus:outline-none focus:border-nox-500 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-nox-600 hover:bg-nox-500 disabled:opacity-30 disabled:hover:bg-nox-600 text-white flex items-center justify-center transition-all"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
