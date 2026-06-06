"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaButton } from "@/components/bellona";
import { OrbitalBackground } from "@/components/ui/OrbitalBackground";
import { FOUNDERS, WEEKLY_KEYS, WEEKLY_ICONS } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, slideInRight, staggerContainer } from "@/lib/animations";

const TRUST_KEYS = ["trust1", "trust2", "trust3"] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tBrand = useTranslations("brand");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-subtle">
      <OrbitalBackground />

      <div className="container-bellona relative z-10 section-padding !pt-24 sm:!pt-28 md:!pt-32 !pb-16 sm:!pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-sm text-bellona-cyan font-medium mb-5 tracking-wide"
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="heading-hero text-[1.75rem] leading-tight sm:text-5xl md:text-6xl lg:text-[3.75rem] mb-5 sm:mb-6"
            >
              <span className="font-body text-bellona-muted font-medium text-[0.62em] sm:text-[0.55em] tracking-wide block mb-2">
                {t("titleLine1")}
              </span>
              <span className="text-gradient-brand">{t("titleLine2")}</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="space-y-1.5 mb-8">
              <p className="font-body text-base md:text-lg text-bellona-white/85">
                {t.rich("benefit1", richTags)}
              </p>
              <p className="font-body text-base md:text-lg text-bellona-white/85">
                {t.rich("benefit2", richTags)}
              </p>
              <p className="font-body text-base md:text-lg text-bellona-muted italic">
                {t.rich("benefit3", richTags)}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mb-8 sm:mb-10"
            >
              <BellonaButton size="lg" className="w-full sm:w-auto justify-center" href="#cta">
                {tBrand("ctaPrimary")}
              </BellonaButton>
              <BellonaButton variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
                <Play size={15} className="fill-current opacity-80" />
                {t("watchDemo")}
              </BellonaButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {TRUST_KEYS.map((key) => (
                <span
                  key={key}
                  className="font-body text-xs text-bellona-muted flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-bellona-blue" />
                  {t(key)}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative lg:sticky lg:top-28"
          >
            <div className="card-elevated p-6 md:p-7 glow-brand shimmer-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-5">
                <h3 className="font-display font-semibold text-bellona-white text-base sm:text-lg">
                  {t("panelTitle")}
                </h3>
                <span className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-body font-medium whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {t("panelStatus")}
                </span>
              </div>

              <div className="space-y-2.5">
                {WEEKLY_KEYS.map((key, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-bellona-cyan/20 hover:bg-bellona-cyan/[0.04] transition-all duration-300"
                  >
                    <span className="text-lg w-8 text-center">
                      {WEEKLY_ICONS[key]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-medium text-bellona-white">
                        {t(`weekly.${key}.label`)}
                      </p>
                      <p className="font-body text-xs text-bellona-muted">
                        {t(`weekly.${key}.status`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  {FOUNDERS.map((f) => (
                    <div
                      key={f.name}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-bellona-cyan/25 to-bellona-violet/15 flex items-center justify-center text-[10px] font-bold text-bellona-cyan border border-white/[0.08]"
                    >
                      {f.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  ))}
                </div>
                <p className="font-body text-xs text-bellona-muted text-start sm:text-end">
                  {t("panelTeam")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
