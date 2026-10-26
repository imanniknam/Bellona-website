"use client";

import { useEffect } from "react";

/** Only on the important lines: headlines, the big statements, and anything marked data-cursor. */
const KEY = "h1, h2, .t-statement, [data-cursor]";
/** Never over these: typing, the 3D scene (it has its own pointer), media, or the open menu. */
const OFF = "input, textarea, select, .agentic-factory-3d, img, video, canvas, [role=dialog]";

/** True for the brand oranges (#FF5500, #F97316, #C2410C, #FF7A33): strong red, low blue. */
function isOrange(color: string) {
  const m = color.match(/\d+(\.\d+)?/g);
  if (!m) return false;
  const [r, g, b] = m.map(Number);
  return r > 180 && b < 90 && g < 150 && r - g > 70;
}

/**
 * Cursor accent for key text. The circle is drawn *inside* the hovered headline, behind its letters
 * (globals.css, .cursor-host::before), so the text always stays on top and readable:
 * brand orange behind black/white text, site black behind orange text (white on dark sections).
 * Its size follows the font size, so it covers the letters under the pointer.
 * Mouse/trackpad only; off for touch and reduced motion.
 */
export function Cursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let host: HTMLElement | null = null;
    const timers = new WeakMap<HTMLElement, number>();

    const release = (el: HTMLElement) => {
      el.style.setProperty("--cs", "0");
      timers.set(
        el,
        window.setTimeout(() => {
          if (el !== host) el.classList.remove("cursor-host");
        }, 300),
      );
    };

    const onMove = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const next = t && t.closest("main") && !t.closest(OFF) ? (t.closest(KEY) as HTMLElement | null) : null;

      if (next !== host) {
        if (host) release(host);
        host = next;
        if (host) {
          window.clearTimeout(timers.get(host));
          const size = parseFloat(getComputedStyle(host).fontSize) * 1.3;
          host.style.setProperty("--cd", `${Math.max(48, Math.round(size))}px`);
          host.classList.add("cursor-host");
        }
      }
      if (!host || !t) return;

      const r = host.getBoundingClientRect();
      host.style.setProperty("--cx", `${(e.clientX - r.left).toFixed(1)}px`);
      host.style.setProperty("--cy", `${(e.clientY - r.top).toFixed(1)}px`);
      const dark = !!host.closest(".on-dark");
      const overOrange = isOrange(getComputedStyle(t).color);
      host.style.setProperty(
        "--cc",
        overOrange ? (dark ? "var(--color-paper)" : "var(--color-ink)") : "var(--color-orange)",
      );
      host.style.setProperty("--cs", "1");
    };

    const onLeave = () => {
      if (host) release(host);
      host = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
