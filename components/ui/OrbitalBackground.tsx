"use client";

import { motion } from "framer-motion";

export function OrbitalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 nebula-glow" />

      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,211,255,0.2) 0%, rgba(74,141,255,0.08) 40%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/3 w-[550px] h-[550px] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,255,0.18) 0%, transparent 65%)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, rgba(74,141,255,0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-bellona-cyan/[0.08]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-bellona-violet/[0.1]"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-bellona-cyan/40"
          style={{ top: `${20 + i * 12}%`, left: `${10 + i * 14}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}
