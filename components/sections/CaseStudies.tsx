"use client";

import { motion } from "framer-motion";
import { BellonaSectionTitle } from "@/components/bellona";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CASE_STUDIES } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function CaseStudies() {
  return (
    <section id="results" className="relative section-padding section-tint-cyan overflow-hidden">
      <div className="container-bellona">
        <BellonaSectionTitle
          eyebrow="Results"
          title={
            <>
              Proven <span className="text-accent-gradient">Outcomes</span>
            </>
          }
          description={
            <>
              Real metrics from companies that replaced <span className="text-accent">manual operations</span> with Bellona AI systems.
            </>
          }
        />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid md:grid-cols-3 gap-5">
          {CASE_STUDIES.map((study) => (
            <motion.article key={study.company} variants={fadeUp} className="card-elevated card-hover-glow p-7 group">
              <span className="text-[11px] text-bellona-cyan uppercase tracking-widest">{study.industry}</span>
              <h3 className="text-lg font-semibold text-bellona-white mt-1 mb-6">{study.company}</h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div>
                  <p className="text-2xl font-bold text-gradient-brand">
                    <AnimatedCounter value={study.hoursSaved} />
                  </p>
                  <p className="text-[10px] text-bellona-muted mt-0.5">Hrs Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gradient-brand">
                    <AnimatedCounter value={study.revenueIncrease} suffix="%" />
                  </p>
                  <p className="text-[10px] text-bellona-muted mt-0.5">Revenue ↑</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gradient-brand">
                    <AnimatedCounter value={study.costReduction} suffix="%" />
                  </p>
                  <p className="text-[10px] text-bellona-muted mt-0.5">Cost ↓</p>
                </div>
              </div>

              <p className="text-sm text-bellona-muted leading-relaxed">{study.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
