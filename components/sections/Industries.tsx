"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, ShoppingCart, HeartPulse, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { BellonaSectionTitle } from "@/components/bellona";
import { INDUSTRIES } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const ICONS = { building: Building2, landmark: Landmark, "shopping-cart": ShoppingCart, "heart-pulse": HeartPulse, briefcase: Briefcase, "graduation-cap": GraduationCap } as const;

export function Industries() {
  return (
    <section id="industries" className="relative section-padding section-panel overflow-hidden">
      <div className="container-bellona">
        <BellonaSectionTitle
          eyebrow="Industries"
          title={
            <>
              Built for <span className="text-accent-gradient">Your Sector</span>
            </>
          }
          description={
            <>
              Tailored AI systems for the workflows, <span className="text-accent">compliance</span>, and growth patterns of your industry.
            </>
          }
        />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.div key={ind.name} variants={fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.4 }} className="group">
                <div className="card-elevated card-hover-glow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-bellona-cyan/[0.08] flex items-center justify-center">
                      <Icon size={20} className="text-bellona-cyan" />
                    </div>
                    <ArrowUpRight size={16} className="text-bellona-muted group-hover:text-bellona-cyan transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                  <h3 className="font-semibold text-bellona-white mb-1.5">{ind.name}</h3>
                  <p className="text-sm text-bellona-muted leading-relaxed">{ind.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
