"use client";

import { Component, type ComponentType, type ReactNode, useEffect, useRef, useState } from "react";
import { faFactoryCopy } from "@/content/factory";
import type { Locale } from "@/content/types";
import type { AgenticFactory3DProps, FactoryCopy, MachineMode } from "./AgenticFactory3D";

/** Shows a quiet panel if WebGL or the scene throws, so the rest of the page keeps working. */
class Boundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type Loaded = { Scene: ComponentType<AgenticFactory3DProps>; copy: FactoryCopy };

const MODES: MachineMode[] = ["assembled", "cutaway", "stations", "order"];

/**
 * The 3D Lead → Revenue machine (agentic-factory-3d). three.js is code-split and only fetched
 * once the box is within ~400px of the viewport, so it never weighs on first load.
 */
export function FactoryEmbed({ locale, unavailable }: { locale: Locale; unavailable: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [mode, setMode] = useState<MachineMode>("assembled");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        import("./AgenticFactory3D").then((mod) => {
          if (cancelled) return;
          const copy = locale === "fa" ? faFactoryCopy(mod.FACTORY_COPY_EN) : mod.FACTORY_COPY_EN;
          setLoaded({ Scene: mod.default, copy });
        });
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [locale]);

  const choose = (m: MachineMode) => {
    setMode(m);
    window.__machine?.setMode(m);
  };

  const fallback = (
    <div className="flex h-full items-center justify-center p-8 text-center text-muted">{unavailable}</div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={box}
        className={`relative h-[clamp(360px,52vw,600px)] overflow-hidden rounded-[32px] border border-line bg-surface ${locale === "fa" ? "font-fa" : "font-sans"}`}
      >
        {loaded ? (
          <Boundary fallback={fallback}>
            <loaded.Scene embed layout="contained" height="100%" copy={loaded.copy} />
          </Boundary>
        ) : (
          <div aria-hidden="true" className="flex h-full items-center justify-center">
            <span className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-3 animate-pulse bg-orange motion-reduce:animate-none"
                  style={{ animationDelay: `${i * 160}ms`, transform: "rotate(45deg)" }}
                />
              ))}
            </span>
          </div>
        )}
      </div>
      {loaded && (
        <div role="group" aria-label={loaded.copy.ui.modeAria} className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => choose(m)}
              className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {loaded.copy.ui.modes[m]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
