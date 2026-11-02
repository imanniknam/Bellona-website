"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends an event when analytics is configured; a no-op otherwise. */
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

/**
 * Optional GA4 (NEXT_PUBLIC_ANALYTICS_ID). Loads lazily so it never competes with the page.
 * CTA clicks are tracked through one delegated listener: any element with
 * data-track="cta" data-track-label="…" sends a `cta_click` event.
 */
export function Analytics({ id, locale }: { id: string | null; locale: string }) {
  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      // Conversion events (SEO-GUIDELINE H): email and chat-app links count as leads wherever they appear.
      // TODO(owner): there is no Telegram/WhatsApp link on the site yet; once one is added it is tracked here with no further change.
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      const href = link?.getAttribute("href") ?? "";
      if (/^mailto:/i.test(href)) track("email_click", { locale, page: window.location.pathname });
      else if (/^https?:\/\/(t\.me|wa\.me|api\.whatsapp\.com)\//i.test(href)) track("chat_click", { channel: /t\.me/i.test(href) ? "telegram" : "whatsapp", locale, page: window.location.pathname });
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track("cta_click", {
        label: el.dataset.trackLabel,
        locale,
        page: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [id, locale]);

  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="lazyOnload" />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(id)},{anonymize_ip:true});`}
      </Script>
    </>
  );
}
