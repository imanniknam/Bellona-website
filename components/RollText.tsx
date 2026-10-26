import type { ReactNode } from "react";

/**
 * Button / link label that rolls on hover: the text slides up and an identical copy (a text-shadow,
 * so screen readers still hear it once) slides in from below. Styles: globals.css, .roll.
 */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
    </span>
  );
}
