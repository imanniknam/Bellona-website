"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BellonaSectionTitle } from "@/components/bellona";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CASE_STUDY_KEYS, CASE_STUDY_STATS } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function CaseStudies() {
  const t = useTranslations("caseStudies");

  return (
    <section id="results" className="relative section-padding section-tint-cyan overflow-hidden">
      <div className="container-bellona">
        <BellonaSectionTitle
          eyebrow={t("eyebrow")}
          title={t.rich("title", richTags)}
          description={t.rich("description", richTags)}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-5"
        >
          {CASE_STUDY_KEYS.map((key) => {
            const stats = CASE_STUDY_STATS[key];
            return (
              <motion.article
                key={key}
                variants={fadeUp}
                className="card-elevated card-hover-glow p-5 sm:p-7 group"
              >
                <span className="text-[11px] text-bellona-cyan uppercase tracking-widest">
                  {t(`items.${key}.industry`)}
                </span>
                <h3 className="text-lg font-semibold text-bellona-white mt-1 mb-6">
                  {t(`items.${key}.company`)}
                </h3>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold text-gradient-brand">
                      <AnimatedCounter value={stats.hoursSaved} />
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-bellona-muted mt-0.5 leading-tight">
                      {t("hoursSaved")}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold text-gradient-brand">
                      <AnimatedCounter
                        value={stats.revenueIncrease}
                        suffix="%"
                      />
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-bellona-muted mt-0.5 leading-tight">
                      {t("revenueUp")}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-bold text-gradient-brand">
                      <AnimatedCounter
                        value={stats.costReduction}
                        suffix="%"
                      />
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-bellona-muted mt-0.5 leading-tight">
                      {t("costDown")}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-bellona-muted leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
