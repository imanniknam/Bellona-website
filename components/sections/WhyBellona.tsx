"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaSectionTitle } from "@/components/bellona";
import { COMPARISON_KEYS } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function WhyBellona() {
  const t = useTranslations("whyBellona");

  return (
    <section id="why-bellona" className="relative section-padding section-tint-blue overflow-hidden">
      <div className="container-bellona">
        <BellonaSectionTitle
          eyebrow={t("eyebrow")}
          title={t.rich("title", richTags)}
          description={t.rich("description", richTags)}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto"
        >
          {/* Mobile: card layout */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:hidden space-y-3"
          >
            {COMPARISON_KEYS.map((key) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="card-elevated p-4 shimmer-border"
              >
                <h3 className="text-sm font-semibold text-bellona-white mb-3">
                  {t(`features.${key}.name`)}
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-3">
                    <p className="text-[10px] text-bellona-muted mb-1.5">
                      {t("traditional")}
                    </p>
                    <div className="flex items-start gap-1.5">
                      <X size={12} className="text-red-400/50 shrink-0 mt-0.5" />
                      <p className="text-xs text-bellona-muted leading-relaxed">
                        {t(`features.${key}.traditional`)}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-bellona-cyan/[0.04] border border-bellona-cyan/15 p-3">
                    <p className="text-[10px] text-bellona-cyan mb-1.5">
                      {t("bellona")}
                    </p>
                    <div className="flex items-start gap-1.5">
                      <Check size={12} className="text-bellona-cyan shrink-0 mt-0.5" />
                      <p className="text-xs text-bellona-white font-medium leading-relaxed">
                        {t(`features.${key}.bellona`)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop: table layout */}
          <div className="hidden md:block card-elevated overflow-hidden shimmer-border glow-brand-sm">
            <div className="grid grid-cols-3 border-b border-white/[0.08] text-sm">
              <div className="p-5" />
              <div className="p-5 text-center text-bellona-muted border-x border-white/[0.08]">
                {t("traditional")}
              </div>
              <div className="p-5 text-center font-semibold text-gradient-brand bg-bellona-cyan/[0.03]">
                {t("bellona")}
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {COMPARISON_KEYS.map((key, i) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className={`grid grid-cols-3 border-b border-white/[0.08] last:border-0 ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                >
                  <div className="p-4 md:p-5 text-sm font-medium text-bellona-white">
                    {t(`features.${key}.name`)}
                  </div>
                  <div className="p-4 md:p-5 flex items-center justify-center gap-2 border-x border-white/[0.08]">
                    <X size={13} className="text-red-400/40 shrink-0" />
                    <span className="text-xs text-bellona-muted text-center">
                      {t(`features.${key}.traditional`)}
                    </span>
                  </div>
                  <div className="p-4 md:p-5 flex items-center justify-center gap-2 bg-bellona-cyan/[0.02]">
                    <Check size={13} className="text-bellona-cyan shrink-0" />
                    <span className="text-xs text-bellona-white font-medium text-center">
                      {t(`features.${key}.bellona`)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
