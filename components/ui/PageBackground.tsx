"use client";

import { motion } from "framer-motion";

export function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-page-mesh" />
      <div className="absolute inset-0 noise-overlay" />

      <motion.div
        className="absolute -top-[20%] left-[10%] w-[700px] h-[700px] rounded-full blur-[120px] opacity-60"
        style={{ background: "radial-gradient(circle, rgba(34,211,255,0.18) 0%, transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-50"
        style={{ background: "radial-gradient(circle, rgba(139,92,255,0.16) 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[90px] opacity-40"
        style={{ background: "radial-gradient(circle, rgba(74,141,255,0.14) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 grid-bg opacity-20" />
    </div>
  );
}
