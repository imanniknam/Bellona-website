"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

interface LogoProps {
  variant?: "header" | "icon" | "icon-sm" | "icon-md" | "icon-lg" | "icon-xl";
  showWordmark?: boolean;
  className?: string;
  floating?: boolean;
}

const sizeClasses = {
  "icon-sm": "h-7 w-7",
  icon: "h-9 w-9 md:h-10 md:w-10",
  "icon-md": "h-12 w-12 md:h-14 md:w-14",
  "icon-lg": "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28",
  "icon-xl": "h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44",
} as const;

const headerSize = "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] md:h-[5rem] md:w-[5rem]";

export function Logo({
  variant = "icon",
  showWordmark = false,
  className,
  floating = false,
}: LogoProps) {
  if (variant === "header") {
    return (
      <Image
        src="/bellona-icon.png"
        alt={BRAND.name}
        width={256}
        height={256}
        className={cn("object-contain object-center block shrink-0", headerSize, className)}
        unoptimized
        priority
      />
    );
  }

  const icon = (
    <Image
      src="/bellona-icon.png"
      alt="Bellona"
      width={400}
      height={400}
      className={cn("object-contain", sizeClasses[variant])}
      unoptimized
      priority
    />
  );

  const content = (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      {icon}
      {showWordmark && (
        <span className="text-[15px] md:text-base font-semibold tracking-tight text-bellona-white">
          {BRAND.name}
        </span>
      )}
    </div>
  );

  if (floating) {
    return (
      <motion.div
        className="relative inline-flex"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 logo-ambient-glow scale-[2] blur-2xl" aria-hidden="true" />
        <div className="relative">{content}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="inline-flex shrink-0"
    >
      {content}
    </motion.div>
  );
}
