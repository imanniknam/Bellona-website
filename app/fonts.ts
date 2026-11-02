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

// Persian (the default "/" pages only). Both OFL, files and licences in app/fonts/.
// The CSS stacks built on these are --font-fa-display and --font-fa-body (globals.css @theme).
// next/font emits a metric-matched fallback face for each (size-adjust etc.), so the swap doesn't shift layout.

// Lahzeh (owner-supplied, FontIran licence): every Persian text, display and body. Subset to Arabic/Persian
// + basic Latin, WOFF2. Only the weights the design uses are shipped (SEO-GUIDELINE G): 400 body, 700 UI, 900
// headings. A request for 500 resolves to 400, 600 to 700 and 800 to 900.
// The earlier Persian faces (Rooyin, Lalezar, Estedad) stay in app/fonts/ for an easy switch back, but are not
// imported here: every localFont() call in a module is bundled, loaded and preloaded whether or not it is used.
export const lahzeh = localFont({
  src: [
    { path: "./fonts/lahzeh/Lahzeh-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lahzeh/Lahzeh-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/lahzeh/Lahzeh-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-lahzeh",
  display: "swap",
  preload: true,
});
