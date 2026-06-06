"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BellonaSectionTitle } from "@/components/bellona";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="process" className="relative section-padding section-panel overflow-hidden">
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
          className="relative"
        >
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bellona-cyan/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div key={step} variants={fadeUp} className="relative group">
                <div className="card-elevated card-hover-glow p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full border border-bellona-cyan/30 flex items-center justify-center glow-brand-sm">
                      <span className="text-sm font-bold text-gradient-brand">
                        {step}
                      </span>
                    </div>
                    {i < HOW_IT_WORKS_STEPS.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px bg-bellona-cyan/10 absolute top-10 left-[calc(100%-8px)] w-5 rtl:left-auto rtl:right-[calc(100%-8px)]" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-bellona-white mb-2">
                    {t(`steps.${step}.title`)}
                  </h3>
                  <p className="text-sm text-bellona-muted leading-relaxed">
                    {t(`steps.${step}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
