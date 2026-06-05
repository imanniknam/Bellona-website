"use client";

import { motion } from "framer-motion";
import { BellonaBadge } from "@/components/bellona/BellonaBadge";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface BellonaSectionTitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function BellonaSectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: BellonaSectionTitleProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("mb-14 md:mb-20", align === "center" && "text-center mx-auto max-w-3xl", className)}
    >
      {eyebrow && (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <BellonaBadge>{eyebrow}</BellonaBadge>
        </div>
      )}
      <h2 className="heading-section text-3xl sm:text-4xl md:text-[2.75rem] text-bellona-white mb-4">{title}</h2>
      {description && (
        <p className="text-prose text-base md:text-lg max-w-2xl mx-auto">{description}</p>
      )}
    </motion.div>
  );
}
