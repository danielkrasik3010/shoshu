export type AvatarColor =
  | "blue"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

export interface CandidateMock {
  id: string;
  name: string;
  initials: string;
  skill: string;
  location: string;
  score: number;
  color: AvatarColor;
  reason: string;
}

export interface StartupMock {
  id: string;
  name: string;
  initials: string;
  color: AvatarColor;
  stage: "Stealth" | "Pre-seed" | "Seed";
  hiring: string;
  founder: { name: string; initials: string };
  description: string;
  score: number;
  reason: string;
}

export interface ConversationMock {
  id: string;
  with: string;
  initials: string;
  color: AvatarColor;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sent: boolean;
  time: string;
}

/* ─── Candidates (for founder page) ────────────────────────── */
export const candidateMocks: CandidateMock[] = [
  {
    id: "sl",
    name: "Sara Levi",
    initials: "SL",
    skill: "Full-stack engineer",
    location: "Tel Aviv",
    score: 94,
    color: "blue",
    reason:
      "5 years shipping B2B SaaS at seed stage. Has done 0-to-1 twice.",
  },
  {
    id: "mr",
    name: "Matan Rosen",
    initials: "MR",
    skill: "Product manager",
    location: "Berlin",
    score: 87,
    color: "amber",
    reason:
      "Scaled a fintech product from 0 to 200k users. Loves early chaos.",
  },
  {
    id: "lk",
    name: "Lior Katz",
    initials: "LK",
    skill: "Product designer",
    location: "Remote",
    score: 79,
    color: "rose",
    reason:
      "Built design systems for 3 early-stage startups. Fast and opinionated.",
  },
  {
    id: "jt",
    name: "Jonas Thal",
    initials: "JT",
    skill: "Backend engineer",
    location: "Amsterdam",
    score: 91,
    color: "violet",
    reason:
      "Infrastructure background, obsessed with developer tooling.",
  },
  {
    id: "np",
    name: "Noa Peretz",
    initials: "NP",
    skill: "Growth & ops",
    location: "Tel Aviv",
    score: 82,
    color: "emerald",
    reason:
      "Ran growth at two YC companies. Knows what actually moves the needle.",
  },
  {
    id: "dw",
    name: "Daniel Weiss",
    initials: "DW",
    skill: "Mobile engineer",
    location: "London",
    score: 76,
    color: "amber",
    reason:
      "React Native specialist who also does design. Ships complete features alone.",
  },
];

/* ─── Filter groups ─────────────────────────────────────────── */
export const candidateFilters = [
  "All",
  "Engineers",
  "Product",
  "Design",
  "Operations",
] as const;

export function filterCandidates(
  items: CandidateMock[],
  filter: string,
): CandidateMock[] {
  if (filter === "All") return items;
  const map: Record<string, string[]> = {
    Engineers: ["engineer"],
    Product: ["product"],
    Design: ["designer"],
    Operations: ["ops", "operations"],
  };
  const keywords = map[filter] ?? [];
  return items.filter((c) =>
    keywords.some((kw) => c.skill.toLowerCase().includes(kw)),
  );
}

/* ─── Startups (for candidate page) ────────────────────────── */
export const startupMocks: StartupMock[] = [
  {
    id: "fn",
    name: "Finova",
    initials: "FN",
    color: "blue",
    stage: "Pre-seed",
    hiring: "1–2",
    founder: { name: "Avi K.", initials: "AK" },
    description:
      "We help freelancers understand their money without needing an accountant.",
    score: 91,
    reason:
      "You mentioned fintech and real-world impact — this is both. They need exactly your background.",
  },
  {
    id: "sc",
    name: "Stealth Co.",
    initials: "??",
    color: "slate",
    stage: "Stealth",
    hiring: "3–5",
    founder: { name: "D.M.", initials: "DM" },
    description:
      "Working on something in climate infrastructure. Not ready to share more yet.",
    score: 84,
    reason:
      "You said climate keeps you up at night. This founder is building right in that space.",
  },
  {
    id: "dx",
    name: "Devx.ai",
    initials: "DX",
    color: "violet",
    stage: "Seed",
    hiring: "1–2",
    founder: { name: "R.L.", initials: "RL" },
    description:
      "A dev environment that configures itself. Zero setup, instant flow state.",
    score: 78,
    reason:
      "Your background in tooling is a direct match. They're looking for someone who's felt this pain.",
  },
  {
    id: "nh",
    name: "Nura Health",
    initials: "NH",
    color: "emerald",
    stage: "Pre-seed",
    hiring: "1–2",
    founder: { name: "S.B.", initials: "SB" },
    description:
      "Helping therapists spend less time on admin and more time with patients.",
    score: 73,
    reason:
      "You flagged health as a mission you care about. Small team, big problem.",
  },
  {
    id: "fc",
    name: "Flowcast",
    initials: "FC",
    color: "amber",
    stage: "Seed",
    hiring: "3–5",
    founder: { name: "T.N.", initials: "TN" },
    description:
      "Supply chain forecasting that actually works for small manufacturers.",
    score: 68,
    reason:
      "Broader mission fit — less direct skill match. Included for the stage and pace of the team.",
  },
];

export const startupFilters = ["All", "Stealth", "Pre-seed", "Seed"] as const;

export function filterStartups(
  items: StartupMock[],
  filter: string,
): StartupMock[] {
  if (filter === "All") return items;
  return items.filter((s) => s.stage === filter);
}

/* ─── Match signals (candidate page strip) ─────────────────── */
export const matchSignals = [
  "Fintech",
  "Early-stage",
  "Remote-friendly",
  "B2B SaaS",
  "Climate",
  "Developer tools",
];

/* ─── Conversations (messages page) ────────────────────────── */
export const conversationsMock: ConversationMock[] = [
  {
    id: "c1",
    with: "Sara Levi",
    initials: "SL",
    color: "blue",
    role: "Full-stack engineer",
    lastMessage: "That sounds great! When can we hop on a call?",
    timestamp: "2m ago",
    unread: true,
    messages: [
      {
        id: "m1",
        text: "Hey Sara! I came across your profile and I think you'd be a great fit for what we're building at Finova.",
        sent: true,
        time: "10:42 AM",
      },
      {
        id: "m2",
        text: "Hi! Finova looks really interesting — I've been thinking a lot about the freelancer finance space lately.",
        sent: false,
        time: "10:58 AM",
      },
      {
        id: "m3",
        text: "We're a small team, moving fast. The role would basically be first engineer. Would you be open to a quick 20-minute intro?",
        sent: true,
        time: "11:03 AM",
      },
      {
        id: "m4",
        text: "That sounds great! When can we hop on a call?",
        sent: false,
        time: "11:07 AM",
      },
    ],
  },
  {
    id: "c2",
    with: "Jonas Thal",
    initials: "JT",
    color: "violet",
    role: "Backend engineer",
    lastMessage: "I'll send you the repo link so you can get a feel for the codebase.",
    timestamp: "1h ago",
    unread: false,
    messages: [
      {
        id: "m1",
        text: "Jonas — your infrastructure background caught my eye. We're building something in the dev tooling space.",
        sent: true,
        time: "9:15 AM",
      },
      {
        id: "m2",
        text: "Interesting. What's the stack look like?",
        sent: false,
        time: "9:31 AM",
      },
      {
        id: "m3",
        text: "Rust for the core runtime, Go services on top. We're obsessed with performance and developer experience.",
        sent: true,
        time: "9:34 AM",
      },
      {
        id: "m4",
        text: "I'll send you the repo link so you can get a feel for the codebase.",
        sent: true,
        time: "9:35 AM",
      },
    ],
  },
  {
    id: "c3",
    with: "Noa Peretz",
    initials: "NP",
    color: "emerald",
    role: "Growth & ops",
    lastMessage: "Let me know if you want to share more about the mission.",
    timestamp: "Yesterday",
    unread: false,
    messages: [
      {
        id: "m1",
        text: "Noa, saw you ran growth at two YC companies. We're at the stage where growth is the whole game.",
        sent: true,
        time: "Yesterday, 4:22 PM",
      },
      {
        id: "m2",
        text: "What are you working on?",
        sent: false,
        time: "Yesterday, 5:01 PM",
      },
      {
        id: "m3",
        text: "Let me know if you want to share more about the mission.",
        sent: false,
        time: "Yesterday, 5:02 PM",
      },
    ],
  },
];
