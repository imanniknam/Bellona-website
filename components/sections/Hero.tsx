"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
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

      <div className="container-bellona relative z-10 section-padding !pt-28 md:!pt-32 !pb-20">
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
              className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] mb-6"
            >
              <span className="font-body text-bellona-muted font-medium text-[0.55em] tracking-wide block mb-2">
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
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <BellonaButton size="lg" href="#cta">
                {tBrand("ctaPrimary")}
              </BellonaButton>
              <BellonaButton variant="secondary" size="lg">
                <Play size={15} className="fill-current opacity-80" />
                {t("watchDemo")}
              </BellonaButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="card-elevated shimmer-border p-5 mb-8 max-w-lg"
              style={{
                background:
                  "linear-gradient(145deg, rgba(18,26,48,0.9) 0%, rgba(10,16,32,0.8) 100%)",
              }}
            >
              <p className="text-prose text-sm italic mb-3">
                &ldquo;{t("testimonialQuote")}&rdquo;
              </p>
              <p className="font-body text-sm text-bellona-white font-medium">
                {t("testimonialAuthor")}
                <span className="text-bellona-muted font-normal">
                  {" "}
                  · {t("testimonialRole")} ({t("testimonialLocation")})
                </span>
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < 4
                        ? "text-amber-400 fill-amber-400"
                        : "text-amber-400/40 fill-amber-400/40"
                    }
                  />
                ))}
                <span className="text-xs text-bellona-muted ms-1">
                  {t("verifiedClient")}
                </span>
              </div>
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
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-bellona-white text-lg">
                  {t("panelTitle")}
                </h3>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-body font-medium">
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

              <div className="mt-5 pt-5 border-t border-white/[0.08] flex items-center justify-between">
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
                <p className="font-body text-xs text-bellona-muted">
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
