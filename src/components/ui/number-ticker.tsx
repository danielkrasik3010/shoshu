"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

type NumberTickerProps = {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  springOptions?: { stiffness?: number; damping?: number };
};

function formatNum(n: number, decimalPlaces: number) {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(n.toFixed(decimalPlaces)));
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  springOptions = { stiffness: 90, damping: 28 },
}: NumberTickerProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const spring = useSpring(motionValue, springOptions);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState(() =>
    formatNum(direction === "down" ? value : 0, decimalPlaces),
  );

  useEffect(() => {
    if (!isInView || started) return;
    const t = window.setTimeout(() => {
      setStarted(true);
      motionValue.set(direction === "down" ? 0 : value);
    }, delay * 1000);
    return () => window.clearTimeout(t);
  }, [isInView, started, motionValue, direction, value, delay]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      setDisplay(formatNum(latest, decimalPlaces));
    });
    return unsub;
  }, [spring, decimalPlaces]);

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex items-baseline tabular-nums", className)}
    >
      {prefix ? <span className="select-none">{prefix}</span> : null}
      <span className="min-w-[0.5ch]">{display}</span>
      {suffix ? <span className="select-none">{suffix}</span> : null}
    </span>
  );
}
