"use client";

import { motion } from "framer-motion";
import { BellonaButton } from "@/components/bellona";
import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { Logo } from "@/components/ui/Logo";
import { BRAND, ROUTES } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section id="cta" className="relative section-padding overflow-hidden">
      <BellonaGlowBackground intensity="strong" nebula />
      <div className="absolute inset-0 bg-gradient-to-t from-bellona-black/80 via-transparent to-bellona-black/40 pointer-events-none" />

      <div className="container-bellona relative z-10 text-center max-w-3xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <div className="logo-ambient-glow p-4 rounded-2xl">
              <Logo variant="icon-md" />
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="heading-section text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="font-body text-bellona-muted font-medium text-[0.5em] tracking-wide block mb-2">
              Stop Hiring More People.
            </span>
            <span className="text-accent-gradient">Build Better Systems.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-prose text-lg mb-10">
            Join companies using Bellona to build <span className="text-accent">AI workforces</span> that operate around the clock.
          </motion.p>
          <motion.div variants={fadeUp}>
            <BellonaButton size="lg" href={ROUTES.getStarted}>{BRAND.cta.primary}</BellonaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
