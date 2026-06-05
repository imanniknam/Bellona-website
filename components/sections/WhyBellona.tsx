"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { BellonaSectionTitle } from "@/components/bellona";
import { COMPARISON } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function WhyBellona() {
  return (
    <section id="why-bellona" className="relative section-padding section-tint-blue overflow-hidden">
      <div className="container-bellona">
        <BellonaSectionTitle
          eyebrow="Why Bellona"
          title={
            <>
              Traditional Team vs <span className="text-accent-gradient">Bellona AI</span>
            </>
          }
          description={
            <>
              See why forward-thinking companies choose <span className="text-accent">intelligent systems</span> over endless hiring.
            </>
          }
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="max-w-3xl mx-auto">
          <div className="card-elevated overflow-hidden shimmer-border glow-brand-sm">
            <div className="grid grid-cols-3 border-b border-white/[0.08] text-sm">
              <div className="p-5" />
              <div className="p-5 text-center text-bellona-muted border-x border-white/[0.08]">Traditional Team</div>
              <div className="p-5 text-center font-semibold text-gradient-brand bg-bellona-cyan/[0.03]">Bellona AI</div>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              {COMPARISON.features.map((f, i) => (
                <motion.div key={f.name} variants={fadeUp} className={`grid grid-cols-3 border-b border-white/[0.08] last:border-0 ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <div className="p-4 md:p-5 text-sm font-medium text-bellona-white">{f.name}</div>
                  <div className="p-4 md:p-5 flex items-center justify-center gap-2 border-x border-white/[0.08]">
                    <X size={13} className="text-red-400/40 shrink-0" />
                    <span className="text-xs text-bellona-muted text-center">{f.traditional}</span>
                  </div>
                  <div className="p-4 md:p-5 flex items-center justify-center gap-2 bg-bellona-cyan/[0.02]">
                    <Check size={13} className="text-bellona-cyan shrink-0" />
                    <span className="text-xs text-bellona-white font-medium text-center">{f.bellona}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
