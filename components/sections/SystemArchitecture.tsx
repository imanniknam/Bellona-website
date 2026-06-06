"use client";

import { motion } from "framer-motion";
import {
  Bot,
  ChartColumn,
  ChevronDown,
  Database,
  DollarSign,
  Users,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaSectionTitle } from "@/components/bellona";
import { SYSTEM_FLOW } from "@/lib/constants";
import { richTags } from "@/lib/rich-tags";
import { fadeUp, viewportOnce } from "@/lib/animations";

const ICONS = {
  users: Users,
  bot: Bot,
  database: Database,
  workflow: Workflow,
  chart: ChartColumn,
  dollar: DollarSign,
} as const;

function FlowNode({
  label,
  icon: Icon,
  index,
  isLast,
}: {
  label: string;
  icon: typeof Users;
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03 }}
        className="relative w-full max-w-[280px]"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-bellona-cyan/20 to-bellona-violet/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
        <div className="relative bg-bellona-card rounded-2xl px-6 py-5 border border-white/[0.08] hover:border-bellona-cyan/25 transition-all duration-500 flex items-center gap-4 shimmer-border">
          <div className="w-10 h-10 rounded-xl bg-bellona-cyan/[0.08] flex items-center justify-center shrink-0">
            <Icon size={20} className="text-bellona-cyan" />
          </div>
          <span className="font-medium text-bellona-white">{label}</span>
          <motion.div
            className="absolute end-4 w-2 h-2 rounded-full bg-bellona-cyan"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          />
        </div>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.1, duration: 0.4 }}
          className="flex flex-col items-center py-3"
          style={{ transformOrigin: "top" }}
        >
          <div className="w-px h-6 bg-gradient-to-b from-bellona-cyan/40 to-bellona-violet/20" />
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
          >
            <ChevronDown size={16} className="text-bellona-cyan/50" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export function SystemArchitecture() {
  const t = useTranslations("architecture");

  return (
    <section id="architecture" className="relative section-padding overflow-hidden section-tint-blue">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,255,0.08) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-bellona relative max-w-lg mx-auto">
        <BellonaSectionTitle
          eyebrow={t("eyebrow")}
          title={t.rich("title", richTags)}
          description={t.rich("description", richTags)}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {SYSTEM_FLOW.map((node, i) => {
            const Icon = ICONS[node.icon];
            return (
              <FlowNode
                key={node.id}
                label={t(`nodes.${node.labelKey}`)}
                icon={Icon}
                index={i}
                isLast={i === SYSTEM_FLOW.length - 1}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
