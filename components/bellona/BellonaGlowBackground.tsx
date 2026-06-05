"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BellonaGlowBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  showGrid?: boolean;
  nebula?: boolean;
}

export function BellonaGlowBackground({
  className,
  intensity = "medium",
  showGrid = true,
  nebula = false,
}: BellonaGlowBackgroundProps) {
  const opacity = {
    subtle: { cyan: 0.08, violet: 0.05 },
    medium: { cyan: 0.14, violet: 0.09 },
    strong: { cyan: 0.2, violet: 0.13 },
  }[intensity];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {showGrid && <div className="absolute inset-0 grid-bg opacity-40" />}
      {nebula && <div className="absolute inset-0 nebula-glow" />}

      <motion.div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[min(1000px,95vw)] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(ellipse, rgba(34,211,255,${opacity.cyan}) 0%, rgba(74,141,255,${opacity.cyan * 0.5}) 40%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[5%] right-[5%] w-[500px] h-[450px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(ellipse, rgba(139,92,255,${opacity.violet}) 0%, transparent 70%)`,
        }}
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {nebula && (
        <motion.div
          className="absolute top-[35%] left-[10%] w-[600px] h-[200px] rounded-full blur-[80px] opacity-30"
          style={{
            background: "linear-gradient(90deg, rgba(34,211,255,0.15), rgba(139,92,255,0.12))",
          }}
          animate={{ x: [0, 40, 0], scaleX: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
