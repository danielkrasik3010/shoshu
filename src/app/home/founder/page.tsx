"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { CandidateCard } from "@/components/candidate-card";
import { FilterPills, FilteredContent } from "@/components/filter-pills";
import {
  candidateMocks,
  candidateFilters,
  filterCandidates,
  type CandidateMock,
} from "@/lib/mock-data";

export default function FounderPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = filterCandidates(candidateMocks, activeFilter);

  return (
    <AppShell
      user={{ name: "Avi Katz", initials: "AK", role: "Founder" }}
      newMatchCount={3}
      unreadCount={1}
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
              People worth meeting
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Ranked by how well they match what you&apos;re building.
            </p>
          </motion.div>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}
          >
            <FilterPills
              filters={candidateFilters}
              active={activeFilter}
              onChange={setActiveFilter}
              accent="blue"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <FilteredContent filterKey={activeFilter}>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
                {filtered.map((candidate, i) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    index={i}
                  />
                ))}
              </div>
            )}
          </FilteredContent>
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
