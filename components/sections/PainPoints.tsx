"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { PAIN_POINT_KEYS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function PainPoints() {
  const t = useTranslations("painPoints");

  return (
    <section className="relative section-padding overflow-hidden section-tint-cyan">
      <BellonaGlowBackground intensity="subtle" nebula />
      <div className="container-bellona relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
        >
          <h2 className="heading-section text-[1.65rem] leading-snug sm:text-4xl md:text-5xl text-bellona-white mb-4 px-1">
            {t("title1")}
            <br />
            <span className="text-subline-cyan text-xl sm:text-3xl md:text-4xl">
              {t("title2")}
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-5"
        >
          {PAIN_POINT_KEYS.map((key, i) => {
            const problems = t.raw(`items.${key}.problems`) as string[];
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="card-elevated card-hover-glow p-7 shimmer-border"
                style={{
                  background: `linear-gradient(160deg, rgba(${i === 0 ? "20,30,55" : i === 1 ? "25,20,50" : "15,25,45"},0.9) 0%, rgba(10,16,32,0.7) 100%)`,
                }}
              >
                <h3 className="font-display text-xl font-semibold text-bellona-white mb-4">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-prose text-sm italic mb-5 border-s-2 border-bellona-blue/50 ps-4">
                  &ldquo;{t(`items.${key}.quote`)}&rdquo;
                </p>
                <ul className="space-y-2.5">
                  {problems.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 font-body text-sm text-bellona-muted"
                    >
                      <X
                        size={14}
                        className="text-red-400/70 shrink-0 mt-0.5"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center font-display text-xl md:text-2xl font-semibold text-bellona-white mt-14 md:mt-20"
        >
          {t("closing1")}
          <br />
          <span className="text-gradient-brand">{t("closing2")}</span>
        </motion.p>
      </div>
    </section>
  );
}
