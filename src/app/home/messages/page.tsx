"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { ChatPanel } from "@/components/chat-panel";
import { conversationsMock } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <AppShell
      user={{ name: "Avi Katz", initials: "AK", role: "Founder" }}
      newMatchCount={3}
      unreadCount={1}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#FAF9F6]/80 backdrop-blur-sm border-b border-slate-200/60 px-8 py-5">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <h1 className="font-serif font-bold text-2xl tracking-tight text-slate-900">
              Messages
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Your conversations with candidates.
            </p>
          </motion.div>
        </div>

        {/* Chat panel */}
        <motion.div
          className="flex-1 overflow-hidden px-8 py-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          <ChatPanel conversations={conversationsMock} />
        </motion.div>
      </div>
    </AppShell>
  );
}
