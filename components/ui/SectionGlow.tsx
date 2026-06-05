"use client";

import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { cn } from "@/lib/utils";

interface SectionGlowProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "cyan" | "violet" | "blue" | "panel";
  glow?: boolean;
  id?: string;
}

const VARIANTS = {
  default: "",
  cyan: "section-tint-cyan",
  violet: "section-tint-violet",
  blue: "section-tint-blue",
  panel: "section-panel",
} as const;

export function SectionGlow({
  children,
  className,
  variant = "default",
  glow = false,
  id,
}: SectionGlowProps) {
  return (
    <section id={id} className={cn("relative section-padding overflow-hidden", VARIANTS[variant], className)}>
      {glow && <BellonaGlowBackground intensity="medium" nebula />}
      <div className="absolute inset-0 section-fade-edges pointer-events-none" aria-hidden="true" />
      <div className="container-bellona relative z-10">{children}</div>
    </section>
  );
}
