"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL = "[data-reveal], .vox:not(.vox-static), [data-count]";

/**
 * Site-wide motion, mounted once per root layout:
 * - smooth wheel scrolling (Lenis) on mouse/trackpad devices; touch keeps native scrolling
 * - scroll reveal for [data-reveal], voxel art and counters
 * Nothing runs with prefers-reduced-motion, and every element is visible without JS.
 */
export function Motion() {
  const pathname = usePathname();

  // Ambient loops (hero floor) start once the page has loaded and gone idle.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => document.documentElement.classList.add("anim-on");
    const idle = () => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(start, { timeout: 4000 });
      else setTimeout(start, 2500); // Safari
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => window.removeEventListener("load", idle);
  }, []);

  // Smooth scrolling: set up once.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: true });
    let frame = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Reveal: re-scan on every route change.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement | SVGElement>(REVEAL));

    // Anything already on screen is marked shown before hiding is enabled, so nothing flickers.
    const vh = window.innerHeight;
    for (const el of items) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("is-in");
    }
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          e.target.dispatchEvent(new CustomEvent("reveal"));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    for (const el of items) if (!el.classList.contains("is-in")) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
