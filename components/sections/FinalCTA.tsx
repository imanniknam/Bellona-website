"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BellonaButton } from "@/components/bellona";
import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function FinalCTA() {
  const t = useTranslations("finalCta");
  const tBrand = useTranslations("brand");

  return (
    <section id="cta" className="relative section-padding overflow-hidden">
      <BellonaGlowBackground intensity="strong" nebula />
      <div className="absolute inset-0 bg-gradient-to-t from-bellona-black/80 via-transparent to-bellona-black/40 pointer-events-none" />

      <div className="container-bellona relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <div className="logo-ambient-glow p-4 rounded-2xl">
              <Logo variant="icon-md" />
            </div>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="heading-section text-[1.65rem] leading-snug sm:text-5xl md:text-6xl mb-5 sm:mb-6 px-2"
          >
            <span className="font-body text-bellona-muted font-medium text-[0.58em] sm:text-[0.5em] tracking-wide block mb-2">
              {t("title1")}
            </span>
            <span className="text-accent-gradient">{t("title2")}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-prose text-base sm:text-lg mb-8 sm:mb-10 px-2">
            {t.rich("description", richTags)}
          </motion.p>
          <motion.div variants={fadeUp} className="px-2">
            <BellonaButton size="lg" className="w-full sm:w-auto justify-center" href={`mailto:${BRAND.email}`}>
              {tBrand("ctaPrimary")}
            </BellonaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
