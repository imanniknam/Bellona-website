"use client";

import { useEffect, useRef } from "react";
import "./motion.css";

/**
 * Animated hero mark: assets/motion/hero-mark.svg inlined, animated by motion.css (verbatim copy).
 * Spec: assets/motion/MOTION.md. Scheduler ported from reference/LogoMotion.dc.html.
 *
 * - The CSS intro runs on first paint, without JS, and ends in the static pose.
 * - After 3.8 s, a random move from the pool plays, then a 1.2–3.2 s rest, forever.
 * - Reduced motion: motion.css disables all animation and no scheduler starts.
 * - Pauses while the hero is off-screen or the tab is hidden.
 * - Under 768 px only the short-travel moves are used.
 */

const MOVES: Record<string, number> = {
  swapL: 2800,
  swapR: 2800,
  leap: 3200,
  hop: 1800,
  drawer: 2600,
  wedge: 1900,
  spin: 2400,
  orbit: 6000,
  twin: 3200,
};
const FULL_POOL = Object.keys(MOVES);
const MOBILE_POOL = ["twin", "hop", "wedge", "swapL", "swapR"];
const INTRO_MS = 3800;

export function HeroMark({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const mobile = window.matchMedia("(max-width: 767px)");
    const groups = [".bm-top", ".bm-bottom", ".bm-wedge", ".bm-ghost"]
      .map((s) => svg.querySelector(s))
      .filter((g): g is Element => g !== null);

    let timer: number | undefined;
    let current: string | null = null;
    let history: string[] = [];
    let onScreen = true;
    let pending = false;

    const setMove = (move: string | null) => {
      for (const g of groups) {
        if (current) g.classList.remove(`mv-${current}`);
        if (move) g.classList.add(`mv-${move}`);
      }
      current = move;
    };

    const canRun = () => onScreen && !document.hidden && !reduce.matches;

    const schedule = (delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(next, delay);
    };

    function next() {
      if (!canRun()) {
        pending = true;
        return;
      }
      pending = false;
      const pool = mobile.matches ? MOBILE_POOL : FULL_POOL;
      const recent = history.slice(0, pool.length > 3 ? 2 : 1);
      const choices = pool.filter((m) => !recent.includes(m));
      const move = choices[Math.floor(Math.random() * choices.length)];
      for (const g of groups) g.classList.add("settled");
      setMove(move);
      history = [move, ...history].slice(0, 6);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setMove(null);
        schedule(1200 + Math.floor(Math.random() * 2000));
      }, MOVES[move] + 60);
    }

    const resume = () => {
      if (pending && canRun()) schedule(400);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        resume();
      },
      { threshold: 0.05 },
    );
    io.observe(svg);

    const onVisibility = () => resume();
    const onReduce = () => {
      if (reduce.matches) {
        window.clearTimeout(timer);
        setMove(null);
        pending = false;
      } else {
        schedule(1200);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onReduce);

    schedule(INTRO_MS);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 -40 200 256"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden="true"
      focusable="false"
    >
      <g className="bm-slab">
        <polygon points="100,113.3 175.7,157 100,200.7 24.3,157" fill="#F97316" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="24.3,168 100,211.7 100,200.7 24.3,157" fill="#FF5500" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="175.7,168 100,211.7 100,200.7 175.7,157" fill="#0D0D0D" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polyline points="38.3,155.8 72.1,175.4 74.9,183" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <polyline points="161.7,155.8 125.9,176.6 123.1,184.1" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
      </g>
      <polyline className="bm-trace" points="38.3,155.8 72.1,175.4 74.9,183" fill="none" stroke="#0D0D0D" strokeWidth="2" />
      <polyline className="bm-trace" points="161.7,155.8 125.9,176.6 123.1,184.1" fill="none" stroke="#0D0D0D" strokeWidth="2" />
      <circle className="bm-via" cx="76.5" cy="186.7" r="2.6" fill="none" stroke="#0D0D0D" strokeWidth="1.8" />
      <circle className="bm-via" cx="121.5" cy="187.8" r="2.6" fill="none" stroke="#0D0D0D" strokeWidth="1.8" />
      <g className="bm-bottom">
        <polygon points="60.2,111 100,88 139.8,111 100,134" fill="#F97316" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="60.2,111 100,134 100,180 60.2,157" fill="#FF5500" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="100,134 139.8,111 139.8,157 100,180" fill="#0D0D0D" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g className="bm-top">
        <polygon points="60.2,43 100,20 139.8,43 100,66" fill="#F97316" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="60.2,43 100,66 100,112 60.2,89" fill="#FF5500" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="100,66 139.8,43 139.8,89 100,112" fill="#0D0D0D" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g className="bm-ghost" aria-hidden="true">
        <polygon points="60.2,111 100,88 139.8,111 100,134" fill="#F97316" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="60.2,111 100,134 100,180 60.2,157" fill="#FF5500" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="100,134 139.8,111 139.8,157 100,180" fill="#0D0D0D" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g className="bm-wedge">
        <polygon points="60.2,89 79.2,100 60.2,111" fill="#FF5500" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
