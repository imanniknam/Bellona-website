"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TRUST_STATS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Trust() {
  return (
    <section className="relative z-[1]">
      <div className="trust-bar-glow" />
      <div className="bg-gradient-to-r from-bellona-navy/60 via-bellona-indigo/40 to-bellona-navy/60 border-y border-white/[0.08] backdrop-blur-sm">
        <div className="container-bellona py-10 md:py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.08]"
          >
            {TRUST_STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center px-4 py-2">
                <p className="font-display text-3xl md:text-4xl font-bold text-gradient-brand tracking-tight mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-body text-xs md:text-sm text-bellona-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="trust-bar-glow" />
    </section>
  );
}
