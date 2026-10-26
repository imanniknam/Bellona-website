import type { IconName } from "@/content/types";

// Line icons only (BRIEF: no emoji). 24×24, stroke = currentColor.
const paths: Record<IconName, string> = {
  cube: "M12 2l9 5v10l-9 5-9-5V7z M12 12l9-5 M12 12v10 M12 12L3 7",
  code: "M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16",
  cycle: "M20 12a8 8 0 0 1-14 5.3 M4 12a8 8 0 0 1 14-5.3 M18 3v4h-4 M6 21v-4h4",
  chart: "M4 20V14 M10 20V9 M16 20V12 M22 20V4 M3 9l6-5 5 4 7-6",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15.5 8.5l-2 5-5 2 2-5z",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M2 21v-1a6 6 0 0 1 12 0v1 M16 3.5a4 4 0 0 1 0 7.5 M22 21v-1a6 6 0 0 0-4-5.6",
  chat: "M4 5h16v11H9l-5 4z",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  layers: "M12 3l9 5-9 5-9-5z M3 13l9 5 9-5",
  home: "M3 11l9-7 9 7 M5 9.5V20h14V9.5 M10 20v-6h4v6",
  bank: "M3 9l9-5 9 5 M4 9h16 M6 9v8 M10 9v8 M14 9v8 M18 9v8 M3 20h18",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z M8.5 12h2l1-2 2 4 1-2h1",
  cart: "M3 4h2l2.4 11h11L21 7H6.2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  briefcase: "M3 8h18v12H3z M8 8V5h8v3 M3 13h18",
  book: "M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z",
  plug: "M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-12 0z M12 17v4",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M21 21l-5-5",
  rocket: "M12 15l-3-3c1-4 4-8 10-9-1 6-5 9-9 10z M9 12l-4 1 2-4h4 M12 15l-1 4 4-2v-4 M6 18l-2 2",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M8.5 12l2.5 2.5 4.5-5",
};

export function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 2,
  flipRtl = false,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  /** Mirror directional icons (arrows) in RTL. */
  flipRtl?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`${flipRtl ? "rtl:-scale-x-100" : ""} ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
