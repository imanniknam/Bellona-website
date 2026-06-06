"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Landmark,
  ShoppingCart,
  HeartPulse,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaSectionTitle } from "@/components/bellona";
import { INDUSTRY_KEYS, INDUSTRY_ICONS } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const ICONS = {
  building: Building2,
  landmark: Landmark,
  "shopping-cart": ShoppingCart,
  "heart-pulse": HeartPulse,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
} as const;

export function Industries() {
  const t = useTranslations("industries");

  return (
    <section id="industries" className="relative section-padding section-panel overflow-hidden">
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {INDUSTRY_KEYS.map((key) => {
            const Icon = ICONS[INDUSTRY_ICONS[key]];
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <div className="card-elevated card-hover-glow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-bellona-cyan/[0.08] flex items-center justify-center">
                      <Icon size={20} className="text-bellona-cyan" />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-bellona-muted group-hover:text-bellona-cyan transition-colors opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="font-semibold text-bellona-white mb-1.5">
                    {t(`items.${key}.name`)}
                  </h3>
                  <p className="text-sm text-bellona-muted leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
