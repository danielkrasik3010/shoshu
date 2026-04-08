"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { StartupCard } from "@/components/startup-card";
import { FilterPills, FilteredContent } from "@/components/filter-pills";
import {
  startupMocks,
  startupFilters,
  filterStartups,
  matchSignals,
} from "@/lib/mock-data";

export default function CandidatePage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = filterStartups(startupMocks, activeFilter);

  return (
    <AppShell
      user={{ name: "Sara Levi", initials: "SL", role: "Candidate" }}
      newMatchCount={2}
      unreadCount={0}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 bg-[#FAF9F6]/80 backdrop-blur-sm border-b border-slate-200/60 px-8 py-5">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <h1 className="font-serif font-bold text-2xl tracking-tight text-slate-900">
              Startups worth your time
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Companies matched to what gets you out of bed.
            </p>
          </motion.div>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}
          >
            <FilterPills
              filters={startupFilters}
              active={activeFilter}
              onChange={setActiveFilter}
              accent="emerald"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <FilteredContent filterKey={activeFilter}>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="flex flex-col gap-5">
                {filtered.map((startup, i) => (
                  <StartupCard key={startup.id} startup={startup} index={i} />
                ))}
              </div>
            )}
          </FilteredContent>

          {/* Match signals strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.45 }}
            className="mt-8 rounded-2xl border border-slate-200/60 bg-slate-50 px-6 py-5"
          >
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-slate-500 shrink-0">
                Matched using signals from your profile:
              </p>
              <div className="flex flex-wrap gap-2">
                {matchSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <a
                href="#"
                className="text-sm text-blue-600 underline-offset-4 hover:underline"
              >
                Update your profile to refine these matches →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="font-serif italic text-slate-400 text-lg text-center animate-[shosu-pulse_2s_ease-in-out_infinite]">
        Shosu
      </p>
      <p className="font-serif italic text-slate-400 text-center max-w-sm">
        Your matches are on their way. We&apos;re still warming up the algorithm.
      </p>
    </div>
  );
}
