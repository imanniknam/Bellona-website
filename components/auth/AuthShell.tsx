"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { BellonaGlowBackground } from "@/components/bellona/BellonaGlowBackground";
import { Logo } from "@/components/ui/Logo";
import { AUTH_BENEFITS, BRAND, ROUTES } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16">
      <BellonaGlowBackground intensity="medium" nebula />

      <div className="container-bellona relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <motion.div variants={fadeUp}>
              <Link href={ROUTES.home} aria-label="Back to home">
                <Logo variant="icon" showWordmark />
              </Link>
            </motion.div>

            <motion.h1 variants={fadeUp} className="heading-section text-4xl xl:text-5xl text-bellona-white mt-10 mb-4">
              {BRAND.tagline}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-prose text-base mb-8 max-w-md">
              Join companies replacing manual work with AI systems that run 24/7 — without hiring another person.
            </motion.p>

            <motion.ul variants={fadeUp} className="space-y-3 mb-10">
              {AUTH_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 font-body text-sm text-bellona-white/85">
                  <span className="w-5 h-5 rounded-full bg-bellona-cyan/15 border border-bellona-cyan/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-bellona-cyan" />
                  </span>
                  {benefit}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="card-elevated p-5 max-w-sm shimmer-border">
              <p className="text-prose text-sm italic mb-3">
                &ldquo;Bellona built our entire lead pipeline in two weeks. We went from chaos to a system that runs itself.&rdquo;
              </p>
              <p className="font-body text-xs text-bellona-muted">Marcus T. · SaaS Founder</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto lg:max-w-none lg:ml-auto"
          >
            <div className="lg:hidden mb-8 flex justify-center">
              <Link href={ROUTES.home}>
                <Logo variant="icon" showWordmark />
              </Link>
            </div>

            <div className="card-elevated shimmer-border glow-brand-sm p-7 md:p-9">
              <h2 className="font-display text-2xl font-bold text-bellona-white mb-2">{title}</h2>
              <p className="text-prose text-sm mb-7">{subtitle}</p>
              {children}
              <div className="mt-6 pt-6 border-t border-white/[0.08] text-center text-sm font-body text-bellona-muted">
                {footer}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
