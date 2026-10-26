"use client";

import { useEffect, useRef } from "react";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const toAscii = (s: string) => s.replace(/[۰-۹]/g, (c) => String(FA.indexOf(c)));

/**
 * Counts a stat up from zero when it scrolls into view ("100+", "80%", "۳ برابر").
 * The server HTML always holds the final value; values like "24/7" are left alone.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const match = /^([0-9۰-۹]+)(.*)$/.exec(value);
    if (!match || value.includes("/")) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible: keep the final value
    const target = Number(toAscii(match[1]));
    const persian = /[۰-۹]/.test(match[1]);
    const fmt = (n: number) => {
      const s = String(n);
      return (persian ? s.replace(/[0-9]/g, (c) => FA[Number(c)]) : s) + match[2];
    };
    el.textContent = fmt(0);
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - t, 4))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    el.addEventListener("reveal", run, { once: true });
    return () => {
      el.removeEventListener("reveal", run);
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} data-count="" className={className}>
      {value}
    </span>
  );
}
