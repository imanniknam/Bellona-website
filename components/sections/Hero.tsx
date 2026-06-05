"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { BellonaButton } from "@/components/bellona";
import { OrbitalBackground } from "@/components/ui/OrbitalBackground";
import {
  BRAND,
  HERO_TESTIMONIAL,
  HERO_TRUST_BAR,
  WEEKLY_STATUS,
  FOUNDERS,
  ROUTES,
} from "@/lib/constants";
import { fadeUp, slideInRight, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-subtle">
      <OrbitalBackground />

      <div className="container-bellona relative z-10 section-padding !pt-28 md:!pt-32 !pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="font-body text-sm text-bellona-cyan font-medium mb-5 tracking-wide">
              Your operations, running 24/7
            </motion.p>

            <motion.h1 variants={fadeUp} className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] mb-6">
              <span className="font-body text-bellona-muted font-medium text-[0.55em] tracking-wide block mb-2">
                It&apos;s Not Just
              </span>
              <span className="text-gradient-brand">You Anymore.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="space-y-1.5 mb-8">
              <p className="font-body text-base md:text-lg text-bellona-white/85">
                Your <span className="text-accent">agents</span> get deployed. Your <span className="text-accent-blue">workflows</span> run.
              </p>
              <p className="font-body text-base md:text-lg text-bellona-white/85">
                Your <span className="text-accent">leads</span> get qualified. Your <span className="text-accent-blue">ops</span> scale.
              </p>
              <p className="font-body text-base md:text-lg text-bellona-muted italic">
                You just... <span className="text-accent-gradient not-italic font-display font-semibold">move on</span> with your day.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-10">
              <BellonaButton size="lg" href={ROUTES.getStarted}>{BRAND.cta.primary}</BellonaButton>
              <BellonaButton variant="secondary" size="lg">
                <Play size={15} className="fill-current opacity-80" />
                Watch 2-Min Demo
              </BellonaButton>
            </motion.div>

            <motion.div variants={fadeUp} className="card-elevated shimmer-border p-5 mb-8 max-w-lg" style={{ background: "linear-gradient(145deg, rgba(18,26,48,0.9) 0%, rgba(10,16,32,0.8) 100%)" }}>
              <p className="text-prose text-sm italic mb-3">&ldquo;{HERO_TESTIMONIAL.quote}&rdquo;</p>
              <p className="font-body text-sm text-bellona-white font-medium">
                {HERO_TESTIMONIAL.author}
                <span className="text-bellona-muted font-normal">
                  {" "}· {HERO_TESTIMONIAL.role} ({HERO_TESTIMONIAL.location})
                </span>
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < 4 ? "text-amber-400 fill-amber-400" : "text-amber-400/40 fill-amber-400/40"} />
                ))}
                <span className="text-xs text-bellona-muted ml-1">Verified client</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
              {HERO_TRUST_BAR.map((item) => (
                <span key={item} className="font-body text-xs text-bellona-muted flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-bellona-blue" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" animate="visible" className="relative lg:sticky lg:top-28">
            <div className="card-elevated p-6 md:p-7 glow-brand shimmer-border">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-bellona-white text-lg">
                  Your automations this week
                </h3>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-body font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  All on track
                </span>
              </div>

              <div className="space-y-2.5">
                {WEEKLY_STATUS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-bellona-cyan/20 hover:bg-bellona-cyan/[0.04] transition-all duration-300"
                  >
                    <span className="text-lg w-8 text-center">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-medium text-bellona-white">{item.label}</p>
                      <p className="font-body text-xs text-bellona-muted">{item.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {FOUNDERS.map((f) => (
                    <div key={f.name} className="w-8 h-8 rounded-full bg-gradient-to-br from-bellona-cyan/25 to-bellona-violet/15 flex items-center justify-center text-[10px] font-bold text-bellona-cyan border border-white/[0.08]">
                      {f.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  ))}
                </div>
                <p className="font-body text-xs text-bellona-muted">Handled by your AI team</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
