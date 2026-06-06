"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface BellonaButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-bellona-blue text-white font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.3)] hover:bg-[#5a9aff] active:bg-[#3a7def]",
  secondary:
    "bg-transparent text-bellona-white font-medium border border-white/[0.2] hover:bg-white/[0.06] hover:border-white/[0.3]",
  ghost:
    "bg-transparent text-bellona-muted hover:text-bellona-white font-medium",
  outline:
    "bg-bellona-black text-bellona-white font-medium border border-white/[0.15] hover:bg-white/[0.04]",
};

const sizes = {
  sm: "h-9 px-4 text-sm rounded-lg gap-1.5",
  md: "h-10 px-5 text-sm rounded-lg gap-2",
  lg: "h-12 px-7 text-[15px] rounded-lg gap-2",
} as const;

export function BellonaButton({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  onClick,
  ...props
}: BellonaButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center transition-colors duration-300 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bellona-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bellona-black",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <motion.span
        whileHover={{ y: variant === "primary" ? -1 : 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="inline-flex"
      >
        <Link href={href} className={classes} onClick={onClick}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      whileHover={{ y: variant === "primary" ? -1 : 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
