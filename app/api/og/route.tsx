import { ImageResponse } from "next/og";

/**
 * Open Graph image: cube mark (geometry from assets/logo/bellona-mark-on-light.svg) + wordmark + page title.
 * /api/og?locale=en&title=Services
 * The OG renderer cannot shape Persian script reliably, so FA cards show the Latin lockup and tagline;
 * the Persian title still travels in og:title.
 */

// Brand tokens (BRIEF.md), inlined because this renders outside the CSS pipeline.
const C = { ink: "#0D0D0D", paper: "#FFFFFF", surface: "#F4F4F2", orange: "#FF5500", orangeLight: "#F97316", muted: "#525252" };

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "fa" ? "fa" : "en";
  const raw = (searchParams.get("title") ?? "").slice(0, 90);
  const title = locale === "en" && raw ? raw : "";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.paper, padding: 72, justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: C.orange }} />
            <div style={{ fontSize: 26, letterSpacing: 6, color: C.muted }}>BUILD · AUTOMATE · GROW</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: title ? 92 : 132, fontWeight: 800, letterSpacing: -4, color: C.ink, lineHeight: 1 }}>
              {title || "bellona"}
            </div>
            <div style={{ fontSize: 34, color: C.muted }}>
              {title ? "bellona agency" : "Websites · Products · AI automation · Growth"}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: C.ink }}>bellonaagency.com{locale === "fa" ? "/fa" : ""}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 340, background: C.surface, borderRadius: 40 }}>
          <svg width="260" height="260" viewBox="8 8 184 184">
            <g stroke={C.surface} strokeWidth="3" strokeLinejoin="round">
              <polygon points="60.2,111 100,88 139.8,111 100,134" fill={C.orangeLight} />
              <polygon points="60.2,111 100,134 100,180 60.2,157" fill={C.orange} />
              <polygon points="100,134 139.8,111 139.8,157 100,180" fill={C.ink} />
              <polygon points="60.2,43 100,20 139.8,43 100,66" fill={C.orangeLight} />
              <polygon points="60.2,43 100,66 100,112 60.2,89" fill={C.orange} />
              <polygon points="100,66 139.8,43 139.8,89 100,112" fill={C.ink} />
              <polygon points="60.2,89 79.2,100 60.2,111" fill={C.orange} />
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
