"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TRUST_STATS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Trust() {
  const t = useTranslations("trust");

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
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-2 sm:gap-x-0 sm:divide-x sm:divide-white/[0.08] sm:rtl:divide-x-reverse"
          >
            {TRUST_STATS.map((stat) => (
              <motion.div
                key={stat.labelKey}
                variants={fadeUp}
                className="text-center px-2 sm:px-4 py-2"
              >
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-brand tracking-tight mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-body text-[11px] sm:text-xs md:text-sm text-bellona-muted leading-snug px-1">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="trust-bar-glow" />
    </section>
  );
}
