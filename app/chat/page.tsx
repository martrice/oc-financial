"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import AppNav from "@/components/AppNav";
import { OLLIE_GREETING } from "@/lib/mock-data";

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

const INITIAL_MESSAGES: Message[] = [
  { id: "msg-greeting", role: "assistant", content: OLLIE_GREETING },
];

const ollieBubbleStyle: React.CSSProperties = {
  background: "#ffffff",
  color: "#0a1a2e",
  fontSize: 18,
  lineHeight: 1.65,
  padding: "22px 26px",
  borderRadius: "40px 40px 40px 12px",
  maxWidth: "92%",
  boxShadow: "0 8px 28px rgba(0, 0, 0, 0.2)",
};

const userBubbleStyle: React.CSSProperties = {
  background: "#226397",
  color: "#ffffff",
  fontSize: 16,
  lineHeight: 1.5,
  padding: "14px 18px",
  borderRadius: "20px 20px 4px 20px",
  maxWidth: "78%",
};

function FormattedText({ content }: { content: string }) {
  return (
    <>
      {content.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ fontWeight: 600 }}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const nextMessageId = () => {
    messageIdRef.current += 1;
    return `msg-${messageIdRef.current}`;
  };

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showSuggestions = userMessageCount === 0 && !typing;

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
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
      .filter((msg) => msg.id !== "msg-greeting")
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

      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          role: "assistant",
          content: data.content,
        },
      ]);
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        background: "#0a1a2e",
      }}
    >
      <AppNav />

      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          height: "100%",
          background: "#0a1a2e",
        }}
      >
        {/* Left column — chat */}
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            ref={threadRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {messages.map((msg) =>
              msg.role === "assistant" ? (
                <div
                  key={msg.id}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <div style={ollieBubbleStyle}>
                    <FormattedText content={msg.content} />
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <div style={userBubbleStyle}>
                    <FormattedText content={msg.content} />
                  </div>
                </div>
              )
            )}

            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={ollieBubbleStyle}>
                  <span style={{ letterSpacing: 4 }}>•••</span>
                </div>
              </div>
            )}

            {showSuggestions && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    style={{
                      borderRadius: "999px",
                      border: "1px solid #4e4463",
                      background: "rgba(78, 68, 99, 0.5)",
                      padding: "6px 14px",
                      fontSize: 13,
                      color: "#e2e8f0",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              padding: "16px",
              borderTop: "1px solid #226397",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Ollie..."
              style={{
                width: "80%",
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #4e4463",
                background: "rgba(78, 68, 99, 0.35)",
                color: "#fff",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              style={{
                width: "18%",
                marginLeft: "2%",
                padding: "12px",
                background: "#226397",
                color: "white",
                borderRadius: "8px",
                border: "none",
                fontSize: "15px",
                fontWeight: 600,
                cursor: input.trim() && !typing ? "pointer" : "not-allowed",
                opacity: input.trim() && !typing ? 1 : 0.5,
              }}
            >
              Send
            </button>
          </form>
        </div>

        {/* Right column — Ollie */}
        <div
          style={{
            width: "35%",
            position: "relative",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ollie.png"
            alt="Ollie"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}
