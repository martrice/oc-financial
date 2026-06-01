"use client";

import { useState, useRef, useEffect } from "react";
import { OC_GREETING } from "@/lib/mock-data";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What's my balance?",
  "Show recent transactions",
  "Help me budget",
  "Saving tips for college",
];

let messageCounter = 0;
function nextMessageId() {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", content: OC_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function sendMessage(text: string) {
    if (!text.trim() || typing) return;

    const userMsg: Message = {
      id: nextMessageId(),
      role: "user",
      content: text.trim(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setTyping(true);

    const apiMessages = updatedMessages
      .filter((msg) => msg.id !== "0")
      .map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      const reply: Message = {
        id: nextMessageId(),
        role: "assistant",
        content: data.content,
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          role: "assistant",
          content: `Sorry, I couldn't connect right now. ${errorMessage}`,
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 pb-6 border-b border-navy-700/50">
        <div className="relative">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-lg shadow-lg shadow-gold-500/25 animate-oc-pulse">
            OC
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-navy-950" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">OC</h2>
          <p className="text-sm text-emerald-400">Online · Your AI companion</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 space-y-4 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gold-500 text-navy-950 rounded-br-md"
                  : "bg-navy-800 text-slate-200 rounded-bl-md border border-navy-700/50"
              }`}
            >
              {msg.content.split("**").map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="font-semibold">
                    {part}
                  </strong>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-navy-800 border border-navy-700/50 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 pb-4">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              disabled={typing}
              className="rounded-full border border-navy-600 bg-navy-800/60 px-4 py-2 text-xs font-medium text-slate-300 hover:border-gold-500/40 hover:text-gold-400 transition-colors disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3 pt-4 border-t border-navy-700/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask OC anything about your finances..."
          className="flex-1 rounded-xl border border-navy-600 bg-navy-800/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/40 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 text-sm font-semibold text-navy-950 hover:from-gold-400 hover:to-gold-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-gold-500/20"
        >
          Send
        </button>
      </form>
    </div>
  );
}
