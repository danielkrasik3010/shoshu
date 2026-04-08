"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ConversationMock, ChatMessage, AvatarColor } from "@/lib/mock-data";

const avatarBg: Record<AvatarColor, string> = {
  blue: "bg-blue-100 text-blue-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  violet: "bg-violet-100 text-violet-700",
  slate: "bg-slate-100 text-slate-600",
};

interface ChatPanelProps {
  conversations: ConversationMock[];
}

export function ChatPanel({ conversations }: ChatPanelProps) {
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, ChatMessage[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];
  const messages = active ? (localMessages[active.id] ?? []) : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!draft.trim() || !active) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      text: draft.trim(),
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setLocalMessages((prev) => ({
      ...prev,
      [active.id]: [...(prev[active.id] ?? []), newMsg],
    }));
    setDraft("");
  };

  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Left panel — conversation list */}
      <div className="w-80 shrink-0 border-r border-slate-200/60 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="font-serif font-bold text-slate-900 text-lg">Messages</p>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors duration-150",
                  isActive
                    ? "bg-blue-50"
                    : "hover:bg-slate-50"
                )}
              >
                <div className="relative shrink-0">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${avatarBg[conv.color]}`}
                  >
                    {conv.initials}
                  </div>
                  {conv.unread && (
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-blue-600 border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("font-semibold text-sm truncate", isActive ? "text-blue-700" : "text-slate-800")}>
                      {conv.with}
                    </span>
                    <span className="text-xs text-slate-400 shrink-0">{conv.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </ScrollArea>
      </div>

      {/* Right panel — thread */}
      {active ? (
        <div className="flex flex-1 flex-col min-w-0">
          {/* Thread header */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarBg[active.color]}`}
            >
              {active.initials}
            </div>
            <div>
              <p className="font-serif font-bold text-slate-900 text-base leading-tight">
                {active.with}
              </p>
              <p className="text-xs text-slate-500">{active.role}</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex", msg.sent ? "justify-end" : "justify-start")}
                >
                  <div className="max-w-[72%]">
                    <div
                      className={cn(
                        "px-4 py-2.5 text-sm leading-relaxed",
                        msg.sent
                          ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                          : "bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm"
                      )}
                    >
                      {msg.text}
                    </div>
                    <p className={cn("text-[11px] mt-1 text-slate-400", msg.sent ? "text-right" : "text-left")}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* Input row */}
          <div className="flex items-center gap-3 border-t border-slate-100 px-6 py-4">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Write something worth reading..."
              className="flex-1 rounded-xl border-slate-200 bg-slate-50 text-sm focus-visible:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={!draft.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-slate-400 text-sm">
          Select a conversation
        </div>
      )}
    </div>
  );
}
