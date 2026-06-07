"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { BellonaButton } from "@/components/bellona";
import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { Logo } from "@/components/ui/Logo";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

export function FinalCTA() {
  const locale = useLocale();
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
        body: JSON.stringify({ email: email.trim(), locale }),
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

          <motion.div variants={fadeUp} className="px-1 sm:px-2">
            {status === "success" ? (
              <p className="text-bellona-cyan font-medium text-sm sm:text-base max-w-md mx-auto">
                {t("success")}
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={cn(
                  "w-full max-w-md sm:max-w-xl mx-auto",
                  "rounded-2xl border border-white/[0.12] bg-bellona-elevated/90",
                  "p-3 sm:p-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
                  "flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2"
                )}
              >
                <label className="flex flex-col gap-2 sm:flex-1 text-start min-w-0">
                  <span className="text-xs font-medium text-bellona-muted px-0.5 sm:sr-only">
                    {t("emailLabel")}
                  </span>
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
                    inputMode="email"
                    enterKeyHint="send"
                    dir="ltr"
                    disabled={status === "loading"}
                    className={cn(
                      "w-full min-h-[3.25rem] px-4 py-3 rounded-xl sm:rounded-lg",
                      "bg-bellona-black/60 border border-white/[0.14]",
                      "text-base text-bellona-white placeholder:text-bellona-muted/60",
                      "focus:outline-none focus:border-bellona-cyan/50 focus:ring-2 focus:ring-bellona-cyan/25",
                      "disabled:opacity-60 transition-colors appearance-none"
                    )}
                  />
                </label>
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
                  className={cn(
                    "w-full sm:w-auto justify-center shrink-0",
                    "min-h-[3.25rem] rounded-xl sm:rounded-lg sm:px-8",
                    "text-base sm:text-[15px]"
                  )}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? t("submitting") : tBrand("ctaPrimary")}
                </BellonaButton>
              </form>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-3 max-w-md mx-auto">{t("error")}</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
