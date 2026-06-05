"use client";

import { motion } from "framer-motion";
import { BellonaSectionTitle } from "@/components/bellona";
import { FOUNDERS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function Team() {
  return (
    <section id="team" className="relative section-padding overflow-hidden section-tint-violet">
      <div className="container-bellona">
        <BellonaSectionTitle
          eyebrow="Leadership"
          title={
            <>
              Meet the <span className="text-accent-gradient">Founders</span>
            </>
          }
          description={
            <>
              The engineers behind Bellona — building the <span className="text-accent">AI systems</span> that run your business while you sleep.
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
        >
          {FOUNDERS.map((founder) => (
            <motion.div
              key={founder.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="card-elevated card-hover-glow p-7 group shimmer-border"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bellona-cyan/20 to-bellona-violet/15 flex items-center justify-center shrink-0 group-hover:glow-brand-sm transition-shadow duration-500">
                  <span className="text-lg font-bold text-gradient-brand">
                    {getInitials(founder.name)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-bellona-white text-lg tracking-tight">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-bellona-cyan">{founder.role}</p>
                </div>
              </div>

              <p className="text-sm font-medium text-bellona-white mb-2">
                {founder.title}
              </p>
              <p className="text-sm text-bellona-muted leading-relaxed">
                {founder.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
