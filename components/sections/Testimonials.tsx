"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BellonaSectionTitle } from "@/components/bellona";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];

  return (
    <section className="relative section-padding section-tint-violet overflow-hidden">
      <div className="container-bellona max-w-3xl">
        <BellonaSectionTitle eyebrow="Testimonials" title="Trusted by Operators" description="Leaders who replaced manual work with intelligent systems." />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="card-elevated shimmer-border glow-brand p-8 md:p-12 min-h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="text-lg md:text-xl text-bellona-white leading-relaxed mb-8 font-light">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bellona-cyan/25 to-bellona-violet/15 flex items-center justify-center text-sm font-semibold text-bellona-cyan">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-bellona-white text-sm">{t.name}</p>
                    <p className="text-xs text-bellona-muted">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "bg-gradient-brand w-6" : "bg-white/15 w-1.5"}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous" className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-bellona-muted hover:text-bellona-white transition-colors">
                  <ChevronLeft size={15} />
                </button>
                <button onClick={() => setCurrent((c) => (c + 1) % TESTIMONIALS.length)} aria-label="Next" className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-bellona-muted hover:text-bellona-white transition-colors">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
