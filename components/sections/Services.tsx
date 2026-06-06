"use client";

import { motion } from "framer-motion";
import { Bot, Workflow, Target, Headphones, Database, Plug } from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaGlowBackground, BellonaSectionTitle } from "@/components/bellona";
import { SERVICE_KEYS, SERVICE_ICONS } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const ICONS = {
  bot: Bot,
  workflow: Workflow,
  target: Target,
  headphones: Headphones,
  database: Database,
  plug: Plug,
} as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative section-padding overflow-hidden section-tint-violet">
      <BellonaGlowBackground intensity="medium" nebula />
      <div className="container-bellona relative z-10">
        <BellonaSectionTitle
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title1")}
              <br />
              <span className="text-accent-gradient">{t("title2")}</span>
            </>
          }
          description={t.rich("description", richTags)}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICE_KEYS.map((key) => {
            const Icon = ICONS[SERVICE_ICONS[key]];
            return (
              <motion.div key={key} variants={fadeUp} className="group relative">
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-bellona-cyan/25 via-bellona-blue/10 to-bellona-violet/15 blur-md" />
                <div className="relative card-elevated card-hover-glow p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-bellona-cyan/20 to-bellona-violet/10 flex items-center justify-center mb-5 group-hover:glow-brand-sm transition-shadow duration-500 border border-white/[0.06]">
                    <Icon size={22} className="text-bellona-cyan" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-bellona-white mb-2">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-prose text-sm">{t(`items.${key}.description`)}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
