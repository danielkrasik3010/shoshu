"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  MessageSquare,
  User,
  Bell,
} from "lucide-react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface AppShellProps {
  children: ReactNode;
  user: {
    name: string;
    initials: string;
    role: "Founder" | "Candidate";
  };
  newMatchCount?: number;
  unreadCount?: number;
}

const roleCls = {
  Founder: "bg-blue-50 text-blue-700",
  Candidate: "bg-emerald-50 text-emerald-700",
};

export function AppShell({
  children,
  user,
  newMatchCount = 3,
  unreadCount = 1,
}: AppShellProps) {
  const pathname = usePathname();

  const baseHref = user.role === "Founder" ? "/home/founder" : "/home/candidate";

  const profileHref =
    user.role === "Founder"
      ? "/home/profile?role=founder"
      : "/home/profile?role=candidate";

  const navItems: NavItem[] = [
    { label: "Matches", href: baseHref, icon: Users, badge: newMatchCount },
    { label: "Messages", href: "/home/messages", icon: MessageSquare, badge: unreadCount },
    { label: "Profile", href: profileHref, icon: User },
    { label: "Notifications", href: "#", icon: Bell },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF9F6]">
      {/* ── Sidebar ── */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-[220px] shrink-0 flex-col border-r border-slate-200/60 bg-white"
      >
        {/* Wordmark */}
        <div className="px-5 pt-6 pb-4">
          <Link href="/" className="font-serif font-bold text-xl text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
            Shosu
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 flex-1 mt-1">
          {navItems.map((item) => {
            const isActive =
              item.href !== "#" &&
              (pathname === item.href ||
                (item.href.startsWith(pathname) && pathname === "/home/profile"));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white leading-none py-0.5">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="flex items-center gap-2.5 border-t border-slate-100 px-4 py-4 mt-auto">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user.name}
            </p>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight ${roleCls[user.role]}`}
            >
              {user.role}
            </span>
          </div>
        </div>
      </motion.aside>

      {/* ── Main content ── */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
