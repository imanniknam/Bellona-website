"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BellonaBadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function BellonaBadge({ children, className, icon }: BellonaBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
        "text-[11px] font-medium tracking-[0.14em] uppercase",
        "text-bellona-cyan/90 bg-bellona-cyan/[0.06] border border-bellona-cyan/12",
        className
      )}
    >
      {icon}
      {children}
    </motion.span>
  );
}
