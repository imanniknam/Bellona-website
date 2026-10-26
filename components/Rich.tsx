import { Fragment, type ReactNode } from "react";

/**
 * Renders the tiny markup used in content/*.ts:
 *   **text** → accent span, ==text== → black pill highlight, \n → <br>.
 * `accent` swaps the accent class (e.g. "accent-ink" on orange backgrounds).
 */
export function Rich({ text, accent = "accent" }: { text: string; accent?: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {renderInline(line, accent)}
        </Fragment>
      ))}
    </>
  );
}

function renderInline(line: string, accent: string): ReactNode[] {
  const parts = line.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**")) {
      return (
        <span key={i} className={accent}>
          {part.slice(2, -2)}
        </span>
      );
    }
    if (part.startsWith("==")) {
      return (
        <span key={i} className="hl">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Plain-text version for metadata and aria labels. */
export function plain(text: string) {
  return text.replace(/\*\*|==/g, "").replace(/\n/g, " ");
}
