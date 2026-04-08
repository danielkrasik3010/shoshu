export interface FounderUser {
  role: "founder";
  name: string;
  email: string;
  startupName: string;
  description: string;
  stage: string;
  hiringCount: string;
  isStealth: boolean;
  story: string;
  link: string;
  isVisible: boolean;
  avatarColor: "blue" | "emerald" | "amber" | "rose" | "violet" | "slate";
}

export interface CandidateUser {
  role: "candidate";
  name: string;
  email: string;
  skill: string;
  missionTags: string[];
  stagePreference: string;
  story: string;
  link: string;
  openToEquity: boolean;
  availability: string;
  avatarColor: "blue" | "emerald" | "amber" | "rose" | "violet" | "slate";
}

export type AppUser = FounderUser | CandidateUser;

export const founderUser: FounderUser = {
  role: "founder",
  name: "Avi Katz",
  email: "avi@finova.io",
  startupName: "Finova",
  description:
    "We help freelancers understand their money without needing an accountant.",
  stage: "pre-seed",
  hiringCount: "1-2",
  isStealth: false,
  story: "",
  link: "finova.io/deck",
  isVisible: true,
  avatarColor: "blue",
};

export const candidateUser: CandidateUser = {
  role: "candidate",
  name: "Noa Ben-David",
  email: "noa@hey.com",
  skill: "Full-stack engineer",
  missionTags: ["Fintech", "Health"],
  stagePreference: "pre-seed-to-seed",
  story: "",
  link: "github.com/noabd",
  openToEquity: true,
  availability: "within-a-month",
  avatarColor: "emerald",
};
