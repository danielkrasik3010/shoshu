"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ProfileHintStrip } from "@/components/profile-hint-strip";
import { ProfileSaveButton } from "@/components/profile-save-button";
import { UnsavedBadge, type CompletionState, dotClasses } from "@/components/profile-shared";

// Section-specific components
import {
  ProfileSectionIdentity,
  type IdentityData,
} from "@/components/profile-section-identity";
import {
  ProfileSectionStartup,
  type StartupData,
} from "@/components/profile-section-startup";
import {
  ProfileSectionWork,
  type WorkData,
} from "@/components/profile-section-work";
import {
  ProfileSectionStory,
  type StoryData,
} from "@/components/profile-section-story";
import {
  ProfileSectionLink,
  type LinkData,
} from "@/components/profile-section-link";
import {
  ProfileSectionVisibility,
  type VisibilityData,
} from "@/components/profile-section-visibility";
import {
  ProfileSectionPrefs,
  type PrefsData,
} from "@/components/profile-section-prefs";

import type { FounderUser, CandidateUser } from "@/lib/mock-user";

/* ── Types ──────────────────────────────────────────────────── */
interface FounderState {
  identity: IdentityData;
  startup: StartupData;
  story: StoryData;
  link: LinkData;
  visibility: VisibilityData;
}

interface CandidateState {
  identity: IdentityData;
  work: WorkData;
  story: StoryData;
  link: LinkData;
  prefs: PrefsData;
}

/* ── Helpers ─────────────────────────────────────────────────── */
function founderCompletion(
  key: keyof FounderState,
  state: FounderState,
): CompletionState {
  switch (key) {
    case "identity":
      if (!state.identity.name && !state.identity.email) return "empty";
      if (state.identity.name && state.identity.email) return "complete";
      return "partial";
    case "startup":
      if (!state.startup.startupName && !state.startup.stage) return "empty";
      if (state.startup.startupName && state.startup.stage && state.startup.hiringCount)
        return "complete";
      return "partial";
    case "story":
      if (!state.story.story) return "empty";
      if (state.story.story.length >= 40) return "complete";
      return "partial";
    case "link":
      return state.link.link ? "complete" : "empty";
    case "visibility":
      return "complete";
    default:
      return "empty";
  }
}

function candidateCompletion(
  key: keyof CandidateState,
  state: CandidateState,
): CompletionState {
  switch (key) {
    case "identity":
      if (!state.identity.name && !state.identity.email) return "empty";
      if (state.identity.name && state.identity.email) return "complete";
      return "partial";
    case "work":
      if (!state.work.skill && state.work.missionTags.length === 0) return "empty";
      if (state.work.skill && state.work.missionTags.length > 0 && state.work.stagePreference)
        return "complete";
      return "partial";
    case "story":
      if (!state.story.story) return "empty";
      if (state.story.story.length >= 40) return "complete";
      return "partial";
    case "link":
      return state.link.link ? "complete" : "empty";
    case "prefs":
      return state.prefs.availability ? "complete" : "partial";
    default:
      return "empty";
  }
}

function getHint(
  sections: { key: string; completion: CompletionState; label: string }[],
): string | null {
  const firstIncomplete = sections.find((s) => s.completion !== "complete");
  if (!firstIncomplete) return "Your profile is complete. Looking good!";
  if (firstIncomplete.key === "identity") return "Start by adding your name and email.";
  if (firstIncomplete.key === "startup") return "Tell candidates what you're building.";
  if (firstIncomplete.key === "work") return "Add your skills and mission areas.";
  if (firstIncomplete.key === "story") return "A personal story makes founders reach out.";
  if (firstIncomplete.key === "link") return "Add a link so people can learn more.";
  return `Complete your ${firstIncomplete.label.toLowerCase()} section.`;
}

/* ── Completion dot component ────────────────────────────────── */
function CompletionDot({ state }: { state: CompletionState }) {
  return (
    <motion.span
      key={state}
      initial={{ scale: 0.8 }}
      animate={{ scale: state === "complete" ? [1, 1.4, 1] : 1 }}
      transition={{ duration: 0.3 }}
      className={`shrink-0 h-3 w-3 rounded-full ${dotClasses(state)} flex items-center justify-center`}
    >
      {state === "complete" && (
        <Check className="h-2 w-2 text-white stroke-[3]" />
      )}
    </motion.span>
  );
}

/* ── Section card wrapper ────────────────────────────────────── */
interface SectionCardProps {
  id: string;
  title: string;
  summary: React.ReactNode;
  completion: CompletionState;
  isOpen: boolean;
  isDirty: boolean;
  accent: "blue" | "emerald";
  children: React.ReactNode;
}

function SectionCard({
  id,
  title,
  summary,
  completion,
  isOpen,
  isDirty,
  accent,
  children,
}: SectionCardProps) {
  const openBorder = accent === "blue" ? "border-blue-300" : "border-emerald-300";
  const openShadow = "shadow-[0_4px_16px_rgba(0,0,0,0.08)]";

  return (
    <AccordionItem
      value={id}
      className={`rounded-2xl border bg-white transition-all duration-200 overflow-hidden
        ${isOpen
          ? `${openBorder} ${openShadow}`
          : "border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        }`}
    >
      {/* Custom trigger */}
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger className="flex h-14 w-full items-center gap-3 px-5 text-left outline-none">
          <CompletionDot state={completion} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif font-semibold text-base text-slate-900">
                {title}
              </span>
              {isDirty && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
              )}
            </div>
            <AnimatePresence mode="wait">
              {!isOpen && summary && (
                <motion.p
                  key="summary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-slate-400 truncate mt-0.5"
                >
                  {summary}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      {/* Animated content */}
      <AccordionPrimitive.Content
        className="overflow-hidden"
        style={{ overflow: "hidden" }}
      >
        <motion.div
          initial={false}
          className="px-5 pb-5 pt-1"
        >
          {children}
          {isDirty && <UnsavedBadge />}
        </motion.div>
      </AccordionPrimitive.Content>
    </AccordionItem>
  );
}

/* ── FOUNDER ACCORDION ───────────────────────────────────────── */
interface FounderAccordionProps {
  initial: FounderUser;
}

export function FounderAccordion({ initial }: FounderAccordionProps) {
  const [state, setState] = useState<FounderState>({
    identity: { name: initial.name, email: initial.email },
    startup: {
      startupName: initial.startupName,
      stage: initial.stage,
      hiringCount: initial.hiringCount,
      description: initial.description,
      isStealth: initial.isStealth,
    },
    story: { story: initial.story },
    link: { link: initial.link },
    visibility: { isVisible: initial.isVisible },
  });

  const [saved, setSaved] = useState<FounderState>(state);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [dirtyMap, setDirtyMap] = useState<Record<string, boolean>>({});

  const sections: { key: keyof FounderState; label: string }[] = [
    { key: "identity", label: "Identity" },
    { key: "startup", label: "Startup" },
    { key: "story", label: "Your story" },
    { key: "link", label: "Link" },
    { key: "visibility", label: "Visibility" },
  ];

  const completions = Object.fromEntries(
    sections.map((s) => [s.key, founderCompletion(s.key, state)]),
  ) as Record<keyof FounderState, CompletionState>;

  const totalComplete = Object.values(completions).filter((c) => c === "complete").length;
  const totalSections = sections.length;
  const progressPct = (totalComplete / totalSections) * 100;

  const hintSections = sections.map((s) => ({
    key: s.key,
    label: s.label,
    completion: completions[s.key],
  }));
  const hint = getHint(hintSections);

  const isDirty = Object.values(dirtyMap).some(Boolean);

  // Auto-open first incomplete on mount
  const didAutoOpen = useRef(false);
  useEffect(() => {
    if (didAutoOpen.current) return;
    didAutoOpen.current = true;
    setTimeout(() => {
      const first = sections.find((s) => completions[s.key] !== "complete");
      if (first) setOpenSections([first.key]);
      else setOpenSections([sections[0].key]);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patch = useCallback(
    <K extends keyof FounderState>(key: K, data: Partial<FounderState[K]>) => {
      setState((prev) => {
        const next = { ...prev, [key]: { ...prev[key], ...data } };
        setDirtyMap((d) => ({ ...d, [key]: true }));
        return next;
      });
    },
    [],
  );

  const handleSave = useCallback(() => {
    setSaved(state);
    setDirtyMap({});
  }, [state]);

  const summaries: Record<keyof FounderState, React.ReactNode> = {
    identity: [state.identity.name, state.identity.email].filter(Boolean).join(" · ") || "Not filled in",
    startup: state.startup.isStealth
      ? `Stealth · ${state.startup.stage}`
      : [state.startup.startupName, state.startup.stage, state.startup.hiringCount ? `Hiring ${state.startup.hiringCount}` : ""].filter(Boolean).join(" · ") || "Not filled in",
    story: state.story.story
      ? state.story.story.slice(0, 40) + (state.story.story.length > 40 ? "…" : "")
      : "Not filled in",
    link: state.link.link || "Not added",
    visibility: state.visibility.isVisible ? "Visible to candidates" : "Hidden (stealth)",
  };

  return (
    <div className="space-y-3">
      {/* Hint strip */}
      <div className="mt-6 mb-4">
        <ProfileHintStrip hint={hint} accent="blue" />
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-400">
          {totalComplete} of {totalSections} sections complete
        </p>
      </div>

      {/* Sections */}
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="space-y-3"
      >
        {sections.map((s) => (
          <SectionCard
            key={s.key}
            id={s.key}
            title={s.label}
            summary={summaries[s.key]}
            completion={completions[s.key]}
            isOpen={openSections.includes(s.key)}
            isDirty={!!dirtyMap[s.key]}
            accent="blue"
          >
            {s.key === "identity" && (
              <ProfileSectionIdentity
                data={state.identity}
                avatarColor={initial.avatarColor}
                onChange={(d) => patch("identity", d)}
              />
            )}
            {s.key === "startup" && (
              <ProfileSectionStartup
                data={state.startup}
                onChange={(d) => patch("startup", d)}
              />
            )}
            {s.key === "story" && (
              <ProfileSectionStory
                data={state.story}
                role="founder"
                onChange={(d) => patch("story", d)}
              />
            )}
            {s.key === "link" && (
              <ProfileSectionLink
                data={state.link}
                role="founder"
                onChange={(d) => patch("link", d)}
              />
            )}
            {s.key === "visibility" && (
              <ProfileSectionVisibility
                data={state.visibility}
                onChange={(d) => patch("visibility", d)}
              />
            )}
          </SectionCard>
        ))}
      </Accordion>

      {/* Floating save */}
      <ProfileSaveButton
        isDirty={isDirty}
        onSave={handleSave}
        accent="blue"
      />

      {/* Keep saved in scope to avoid TS unused var */}
      <span className="sr-only">{JSON.stringify(saved).length}</span>
    </div>
  );
}

/* ── CANDIDATE ACCORDION ─────────────────────────────────────── */
interface CandidateAccordionProps {
  initial: CandidateUser;
}

export function CandidateAccordion({ initial }: CandidateAccordionProps) {
  const [state, setState] = useState<CandidateState>({
    identity: { name: initial.name, email: initial.email },
    work: {
      skill: initial.skill,
      missionTags: initial.missionTags,
      stagePreference: initial.stagePreference,
    },
    story: { story: initial.story },
    link: { link: initial.link },
    prefs: {
      openToEquity: initial.openToEquity,
      availability: initial.availability,
    },
  });

  const [saved, setSaved] = useState<CandidateState>(state);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [dirtyMap, setDirtyMap] = useState<Record<string, boolean>>({});

  const sections: { key: keyof CandidateState; label: string }[] = [
    { key: "identity", label: "Identity" },
    { key: "work", label: "Your work" },
    { key: "story", label: "Your story" },
    { key: "link", label: "Link" },
    { key: "prefs", label: "Preferences" },
  ];

  const completions = Object.fromEntries(
    sections.map((s) => [s.key, candidateCompletion(s.key, state)]),
  ) as Record<keyof CandidateState, CompletionState>;

  const totalComplete = Object.values(completions).filter((c) => c === "complete").length;
  const totalSections = sections.length;
  const progressPct = (totalComplete / totalSections) * 100;

  const hintSections = sections.map((s) => ({
    key: s.key,
    label: s.label,
    completion: completions[s.key],
  }));
  const hint = getHint(hintSections);

  const isDirty = Object.values(dirtyMap).some(Boolean);

  const didAutoOpen = useRef(false);
  useEffect(() => {
    if (didAutoOpen.current) return;
    didAutoOpen.current = true;
    setTimeout(() => {
      const first = sections.find((s) => completions[s.key] !== "complete");
      if (first) setOpenSections([first.key]);
      else setOpenSections([sections[0].key]);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patch = useCallback(
    <K extends keyof CandidateState>(key: K, data: Partial<CandidateState[K]>) => {
      setState((prev) => {
        const next = { ...prev, [key]: { ...prev[key], ...data } };
        setDirtyMap((d) => ({ ...d, [key]: true }));
        return next;
      });
    },
    [],
  );

  const handleSave = useCallback(() => {
    setSaved(state);
    setDirtyMap({});
  }, [state]);

  const summaries: Record<keyof CandidateState, React.ReactNode> = {
    identity: [state.identity.name, state.identity.email].filter(Boolean).join(" · ") || "Not filled in",
    work: [
      state.work.skill,
      state.work.missionTags.length ? `${state.work.missionTags.length} mission areas` : "",
    ].filter(Boolean).join(" · ") || "Not filled in",
    story: state.story.story
      ? state.story.story.slice(0, 40) + (state.story.story.length > 40 ? "…" : "")
      : "Not filled in",
    link: state.link.link || "Not added",
    prefs: state.prefs.openToEquity ? "Open to equity" : "Salary only",
  };

  return (
    <div className="space-y-3">
      <div className="mt-6 mb-4">
        <ProfileHintStrip hint={hint} accent="emerald" />
      </div>

      <div className="mb-6">
        <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-400">
          {totalComplete} of {totalSections} sections complete
        </p>
      </div>

      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="space-y-3"
      >
        {sections.map((s) => (
          <SectionCard
            key={s.key}
            id={s.key}
            title={s.label}
            summary={summaries[s.key]}
            completion={completions[s.key]}
            isOpen={openSections.includes(s.key)}
            isDirty={!!dirtyMap[s.key]}
            accent="emerald"
          >
            {s.key === "identity" && (
              <ProfileSectionIdentity
                data={state.identity}
                avatarColor={initial.avatarColor}
                onChange={(d) => patch("identity", d)}
              />
            )}
            {s.key === "work" && (
              <ProfileSectionWork
                data={state.work}
                onChange={(d) => patch("work", d)}
              />
            )}
            {s.key === "story" && (
              <ProfileSectionStory
                data={state.story}
                role="candidate"
                onChange={(d) => patch("story", d)}
              />
            )}
            {s.key === "link" && (
              <ProfileSectionLink
                data={state.link}
                role="candidate"
                onChange={(d) => patch("link", d)}
              />
            )}
            {s.key === "prefs" && (
              <ProfileSectionPrefs
                data={state.prefs}
                onChange={(d) => patch("prefs", d)}
              />
            )}
          </SectionCard>
        ))}
      </Accordion>

      <ProfileSaveButton
        isDirty={isDirty}
        onSave={handleSave}
        accent="emerald"
      />

      <span className="sr-only">{JSON.stringify(saved).length}</span>
    </div>
  );
}

/* Re-export for section components that used to import from here */
export { FieldLabel, inputCls } from "@/components/profile-shared";
