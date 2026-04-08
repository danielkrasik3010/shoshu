export type AvatarColorKey =
  | "blue"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

export const avatarBgMap: Record<AvatarColorKey, string> = {
  blue:    "bg-blue-100 text-blue-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber:   "bg-amber-100 text-amber-700",
  rose:    "bg-rose-100 text-rose-700",
  violet:  "bg-violet-100 text-violet-700",
  slate:   "bg-slate-100 text-slate-600",
};

export function getAvatarBg(color: AvatarColorKey): string {
  return avatarBgMap[color] ?? avatarBgMap.slate;
}

/** Derive initials from a display name */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
