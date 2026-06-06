"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BellonaButton } from "@/components/bellona";
import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { Logo } from "@/components/ui/Logo";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

export function FinalCTA() {
  const t = useTranslations("finalCta");
  const tBrand = useTranslations("brand");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) throw new Error("submit failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

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
            {status === "success" ? (
              <p className="text-bellona-cyan font-medium text-sm sm:text-base">
                {t("success")}
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={t("emailPlaceholder")}
                  required
                  autoComplete="email"
                  disabled={status === "loading"}
                  className={cn(
                    "flex-1 h-12 px-4 rounded-lg bg-white/[0.04] border border-white/[0.12]",
                    "text-bellona-white placeholder:text-bellona-muted/70 text-sm sm:text-base",
                    "focus:outline-none focus:border-bellona-cyan/40 focus:ring-2 focus:ring-bellona-cyan/20",
                    "disabled:opacity-60 transition-colors"
                  )}
                />
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <BellonaButton
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto justify-center shrink-0"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? t("submitting") : tBrand("ctaPrimary")}
                </BellonaButton>
              </form>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-3">{t("error")}</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
