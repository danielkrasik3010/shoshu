"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For founders", href: "#for-founders" },
  { label: "For candidates", href: "#for-candidates" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const demoLinks = [
  { label: "Founder demo", href: "/home/founder" },
  { label: "Candidate demo", href: "/home/candidate" },
  { label: "Messages", href: "/home/messages" },
  { label: "Profile", href: "/home/profile" },
] as const;

const demoButtonClass = cn(
  buttonVariants({ variant: "outline", size: "sm" }),
  "rounded-xl border-slate-200 text-slate-600 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50/80 whitespace-nowrap text-xs lg:text-sm px-2.5 lg:px-3"
);

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/92 backdrop-blur-md border-b border-border/55 shadow-sm"
          : "border-b border-border/30 bg-background/55 backdrop-blur-md supports-[backdrop-filter]:bg-background/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity shrink-0"
        >
          Shosu
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Demo + CTAs — desktop */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0 flex-wrap justify-end">
          {demoLinks.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className={demoButtonClass}
            >
              {demo.label}
            </Link>
          ))}
          <Link
            href="#founder-form"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-[var(--color-founder)] hover:bg-[var(--color-founder)]/90 text-white border-0"
            )}
          >
            I&apos;m hiring →
          </Link>
          <Link
            href="#candidate-form"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            I&apos;m looking →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button variant="ghost" size="icon" aria-label="Open navigation">
                <MenuIcon className="h-5 w-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-80">
            <SheetHeader className="mb-6">
              <SheetTitle className="font-serif text-xl text-left">Shosu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-1">
              Try the app (demo)
            </p>
            <div className="flex flex-col gap-2 mb-8">
              {demoLinks.map((demo) => (
                <Link
                  key={demo.href}
                  href={demo.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "w-full rounded-xl border-slate-200"
                  )}
                >
                  {demo.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="#founder-form"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "default" }),
                  "w-full bg-[var(--color-founder)] hover:bg-[var(--color-founder)]/90 text-white border-0"
                )}
              >
                I&apos;m hiring →
              </Link>
              <Link
                href="#candidate-form"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full"
                )}
              >
                I&apos;m looking →
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
