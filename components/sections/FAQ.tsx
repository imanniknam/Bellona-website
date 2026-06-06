"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaSectionTitle } from "@/components/bellona";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.08] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-start group min-h-[3.25rem]"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm sm:text-base text-bellona-white group-hover:text-bellona-cyan transition-colors duration-500 leading-relaxed">
          {question}
        </span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-bellona-cyan/[0.06] flex items-center justify-center text-bellona-cyan">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-bellona-muted leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section-padding section-panel overflow-hidden">
      <div className="container-bellona max-w-2xl">
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
          className="card-elevated shimmer-border px-4 sm:px-6"
        >
          {items.map((item, i) => (
            <motion.div key={item.q} variants={fadeUp}>
              <FAQItem
                question={item.q}
                answer={item.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
