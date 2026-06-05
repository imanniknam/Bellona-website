"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => {
    const formatted =
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    return `${prefix}${formatted}${suffix}`;
  });
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setText(v));
    return unsubscribe;
  }, [display]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
