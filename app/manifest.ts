import type { MetadataRoute } from "next";

// Web app manifest (SEO-GUIDELINE 6-2). Colours are the site's own: ink #0D0D0D on the dark tile, paper white.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "آژانس بلونا",
    short_name: "بلونا",
    description: "Bellona Agency: طراحی سایت اختصاصی و اتوماسیون هوش مصنوعی",
    start_url: "/",
    lang: "fa",
    dir: "rtl",
    display: "browser",
    theme_color: "#0D0D0D",
    background_color: "#FFFFFF",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/bellona-logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
