"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import {
  FounderAccordion,
  CandidateAccordion,
} from "@/components/profile-accordion";
import { founderUser, candidateUser } from "@/lib/mock-user";

function ProfileContent() {
  const params = useSearchParams();
  const role = params.get("role") === "candidate" ? "candidate" : "founder";

  const isCandidate = role === "candidate";
  const user = isCandidate ? candidateUser : founderUser;
  const subtitle = isCandidate
    ? "How you appear to founders"
    : "How you appear to candidates";

  return (
    <AppShell
      user={{
        name: user.name,
        initials: user.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        role: isCandidate ? "Candidate" : "Founder",
      }}
      newMatchCount={isCandidate ? 2 : 3}
      unreadCount={1}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 bg-[#FAF9F6]/80 backdrop-blur-sm border-b border-slate-200/60 px-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <h1 className="font-serif font-bold text-2xl tracking-tight text-slate-900">
              Your profile
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
          </motion.div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            className="max-w-[640px] mx-auto px-8 pb-32"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            {isCandidate ? (
              <CandidateAccordion initial={candidateUser} />
            ) : (
              <FounderAccordion initial={founderUser} />
            )}
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileContent />
    </Suspense>
  );
}
