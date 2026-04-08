"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Card3DProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Max tilt in degrees on each axis (subtle default) */
  intensity?: number;
};

/**
 * Subtle perspective tilt on hover — content stays readable.
 */
export function Card3D({
  children,
  className,
  containerClassName,
  intensity = 9,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * intensity * 2);
    setRotateX(-y * intensity * 2);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "perspective-[1100px] [perspective-origin:center_center]",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "transform-gpu transition-transform duration-300 ease-out will-change-transform",
          className,
        )}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
