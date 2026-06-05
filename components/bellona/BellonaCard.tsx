"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BellonaCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
}

export function BellonaCard({
  children,
  className,
  glow = false,
  interactive = true,
  ...props
}: BellonaCardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -3 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl card-elevated",
        interactive && "card-hover-glow",
        glow && "glow-brand-sm",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
