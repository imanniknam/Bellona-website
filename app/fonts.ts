import localFont from "next/font/local";

// Every font is a file in app/fonts/ (all OFL, licences alongside), so neither the build nor the
// running site contacts Google Fonts or any other font CDN. next/font serves them from /_next/static
// and generates a metric-matched fallback face for each.

// Plus Jakarta Sans, Google Fonts latin subset, variable (weights 200–800 in one file).
// display: "optional" (owner decision): the preloaded font is used if it arrives within the first
// ~100ms, otherwise the metric-matched fallback stays for that view, so the hero headline is never
// re-painted by a late font swap (better LCP on slow mobile). Repeat visits get it from cache.
export const jakarta = localFont({
  src: "./fonts/jakarta/PlusJakartaSans-latin-var.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "optional",
  preload: true,
});

// JetBrains Mono, Google Fonts latin subset, variable (400 and 500 are used).
// Mono is only used for small English labels, so it is not preloaded.
export const jetbrains = localFont({
  src: "./fonts/jetbrains/JetBrainsMono-latin-var.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

// Persian (/fa only). Both OFL, files and licences in app/fonts/.
// The CSS stacks built on these are --font-fa-display and --font-fa-body (globals.css @theme).
// next/font emits a metric-matched fallback face for each (size-adjust etc.), so the swap doesn't shift layout.

// Lalezar: display only (headlines, big numbers). The owner's file (v1.003), subset to Arabic/Persian
// + basic Latin and converted to WOFF2. A single weight: never bold it. (Rooyin stays in app/fonts/rooyin.)
export const lalezar = localFont({
  src: [{ path: "./fonts/lalezar/Lalezar-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-lalezar",
  display: "swap",
  preload: true,
});

// Estedad: everything else. Body 700, UI 800, captions 500–600, small emphasis 900.
// next/font preloads per family, not per weight, so this family is not preloaded (six files);
// it is requested as soon as the stylesheet is parsed.
export const estedad = localFont({
  src: [
    { path: "./fonts/estedad/Estedad-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/estedad/Estedad-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/estedad/Estedad-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/estedad/Estedad-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/estedad/Estedad-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/estedad/Estedad-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-estedad",
  display: "swap",
  preload: false,
});
