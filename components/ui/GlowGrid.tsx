"use client";

import { motion } from "framer-motion";

interface GlowGridProps {
  className?: string;
}

export function GlowGrid({ className = "" }: GlowGridProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,210,255,0.12) 0%, rgba(157,80,187,0.06) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(157,80,187,0.1) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
