import type { ReactNode } from "react";

export const richTags = {
  highlight: (chunks: ReactNode) => (
    <span className="text-accent-gradient">{chunks}</span>
  ),
  accent: (chunks: ReactNode) => (
    <span className="text-accent">{chunks}</span>
  ),
  blue: (chunks: ReactNode) => (
    <span className="text-accent-blue">{chunks}</span>
  ),
  gradient: (chunks: ReactNode) => (
    <span className="text-accent-gradient not-italic font-display font-semibold">
      {chunks}
    </span>
  ),
  time: (chunks: ReactNode) => (
    <span className="text-accent">{chunks}</span>
  ),
};
