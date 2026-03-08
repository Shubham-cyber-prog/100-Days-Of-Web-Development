"use client";

import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

type Role = "user" | "assistant";

type Message = {
  role: Role;
  content: string;
};

type Chat = {
  id: string;
  title: string;
  model: string;
  messages: Message[];
};

const MODELS = [
  { label: "Qwen 3 (8B)", value: "qwen3:8b" },
  { label: "Gemma 3 (4B)", value: "gemma3:4b" },
  { label: "DeepSeek R1 (8B)", value: "deepseek-r1:8b" },
];

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  function createNewChat() {
    const id = nanoid();
    const newChat: Chat = {
      id,
      title: "New Chat",
      model: "qwen3:8b",
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(id);
  }

  async function sendMessage() {
    if (!input.trim() || !activeChat || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              title: chat.messages.length === 0 ? userText.slice(0, 30) : chat.title,
              messages: [
                ...chat.messages,
                { role: "user", content: userText },
                { role: "assistant", content: "" },
              ],
            }
          : chat
      )
    );

    try {
      const res = await fetch("http://localhost:5000/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          model: activeChat.model,
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        aiText += decoder.decode(value);

        setChats((prev) =>
          prev.map((chat) =>
            chat.id === activeChat.id
              ? {
                  ...chat,
                  messages: chat.messages.map((m, i) =>
                    i === chat.messages.length - 1
                      ? { role: "assistant", content: aiText }
                      : m
                  ),
                }
              : chat
          )
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-4 space-y-3">
        <button
          onClick={createNewChat}
          className="w-full bg-blue-600 py-2 rounded-lg font-medium"
        >
          + New Chat
        </button>

        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-2 rounded-lg cursor-pointer truncate ${
                chat.id === activeChatId
                  ? "bg-zinc-800"
                  : "hover:bg-zinc-900"
              }`}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <span className="font-semibold">AI Chat</span>

          {activeChat && (
            <select
              value={activeChat.model}
              onChange={(e) =>
                setChats((prev) =>
                  prev.map((chat) =>
                    chat.id === activeChat.id
                      ? { ...chat, model: e.target.value }
                      : chat
                  )
                )
              }
              className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1"
            >
              {MODELS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          )}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-3">
            {activeChat?.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xl px-4 py-3 rounded-xl whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600"
                    : "mr-auto bg-zinc-800"
                }`}
              >
                {msg.content || (msg.role === "assistant" && "▍")}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something…"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 px-4 py-2 rounded-lg font-medium"
          >
            Send
          </button>
        </div>
      </section>
    </main>
  );
}
