"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BellonaButton } from "@/components/bellona";
import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function WeekComparison() {
  const t = useTranslations("weekComparison");
  const beforeTasks = t.raw("beforeTasks") as string[];
  const afterTasks = t.raw("afterTasks") as string[];

  return (
    <section className="relative section-padding overflow-hidden">
      <BellonaGlowBackground intensity="strong" showGrid={false} />
      <div className="container-bellona relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-subline-cyan text-sm mb-3">{t("eyebrow")}</p>
          <h2 className="heading-section text-3xl sm:text-4xl md:text-5xl text-bellona-white">
            {t("title1")}
            <br />
            <span className="text-accent-gradient">{t("title2")}</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="card-elevated p-7 border-red-500/20"
            style={{
              background:
                "linear-gradient(160deg, rgba(40,15,20,0.8) 0%, rgba(15,18,32,0.75) 100%)",
            }}
          >
            <h3 className="font-display text-lg font-semibold text-red-400 mb-5">
              {t("beforeTitle")}
            </h3>
            <p className="text-prose text-sm mb-5">{t("beforeIntro")}</p>
            <div className="space-y-2 max-h-64 overflow-hidden relative">
              {[...beforeTasks, ...beforeTasks].map((task, i) => (
                <div
                  key={i}
                  className="font-body text-sm px-3 py-2 rounded-lg bg-red-500/8 border border-red-500/15 text-bellona-muted"
                >
                  {task}
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(15,18,32,0.9)] to-transparent" />
            </div>
            <p className="font-display text-sm font-medium text-bellona-muted mt-4">
              {t("beforeClosing")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="card-elevated p-7 glow-brand shimmer-border"
            style={{
              background:
                "linear-gradient(160deg, rgba(15,35,30,0.85) 0%, rgba(12,20,40,0.8) 100%)",
            }}
          >
            <h3 className="font-display text-lg font-semibold text-emerald-400 mb-5">
              {t("afterTitle")}
            </h3>
            <p className="text-prose text-sm mb-5">{t("afterIntro")}</p>
            <ul className="space-y-2.5">
              {afterTasks.map((task) => (
                <li
                  key={task}
                  className="flex items-center gap-2.5 font-body text-sm text-bellona-white px-3 py-2 rounded-lg bg-emerald-500/8 border border-emerald-500/15"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {task}
                </li>
              ))}
            </ul>
            <p className="font-display text-sm font-medium text-bellona-white mt-5">
              {t("afterClosing")}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mt-12"
        >
          <BellonaButton
            variant="secondary"
            size="lg"
            onClick={() =>
              document
                .getElementById("process")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("cta")}
          </BellonaButton>
        </motion.div>
      </div>
    </section>
  );
}
