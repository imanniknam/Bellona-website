"use client";

import { motion } from "framer-motion";
import { BellonaSectionTitle } from "@/components/bellona";
import { HOW_IT_WORKS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function HowItWorks() {
  return (
    <section id="process" className="relative section-padding section-panel overflow-hidden">
      <div className="container-bellona">
        <BellonaSectionTitle
          eyebrow="Process"
          title={
            <>
              How Bellona <span className="text-accent-gradient">Works</span>
            </>
          }
          description={
            <>
              A proven five-step framework from audit to optimization — deployed in <span className="text-accent">weeks, not months</span>.
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bellona-cyan/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.step} variants={fadeUp} className="relative group">
                <div className="card-elevated card-hover-glow p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full border border-bellona-cyan/30 flex items-center justify-center glow-brand-sm">
                      <span className="text-sm font-bold text-gradient-brand">{step.step}</span>
                    </div>
                    {i < HOW_IT_WORKS.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px bg-bellona-cyan/10 absolute top-10 left-[calc(100%-8px)] w-5" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-bellona-white mb-2">{step.title}</h3>
                  <p className="text-sm text-bellona-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
