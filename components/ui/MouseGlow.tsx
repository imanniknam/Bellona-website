"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function MouseGlow({ className = "" }: { className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(34,211,255,0.04), rgba(139,92,255,0.02) 40%, transparent 75%)`;

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background }}
      aria-hidden="true"
    />
  );
}
