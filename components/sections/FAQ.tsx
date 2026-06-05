"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { BellonaSectionTitle } from "@/components/bellona";
import { FAQ_ITEMS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.08] last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left group" aria-expanded={isOpen}>
        <span className="font-medium text-bellona-white pr-8 group-hover:text-bellona-cyan transition-colors duration-500">{question}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-bellona-cyan/[0.06] flex items-center justify-center text-bellona-cyan">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="text-sm text-bellona-muted leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section-padding section-panel overflow-hidden">
      <div className="container-bellona max-w-2xl">
        <BellonaSectionTitle
          eyebrow="FAQ"
          title={
            <>
              Common <span className="text-accent-gradient">Questions</span>
            </>
          }
          description={
            <>
              Everything you need to know before building your <span className="text-accent">AI workforce</span>.
            </>
          }
        />
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="card-elevated shimmer-border px-6">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div key={item.question} variants={fadeUp}>
              <FAQItem question={item.question} answer={item.answer} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
