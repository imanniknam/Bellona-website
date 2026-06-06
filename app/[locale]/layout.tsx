import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { PageBackground } from "@/components/ui/PageBackground";
import { routing, type Locale } from "@/i18n/routing";
import { BRAND } from "@/lib/constants";
import { absoluteUrl, localePath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060a12",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    metadataBase: new URL(BRAND.url),
    title: { default: messages.meta.title, template: `%s | Bellona` },
    description: messages.meta.description,
    keywords: ["AI automation", "AI agents", "workflow automation", "AI agency"],
    icons: { icon: "/bellona-icon.png", apple: "/bellona-icon.png" },
    alternates: {
      canonical: localePath(locale),
      languages: {
        fa: localePath("fa"),
        en: localePath("en"),
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.ogDescription,
      type: "website",
      siteName: "Bellona",
      url: absoluteUrl(locale),
    },
    robots: { index: true, follow: true },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "fa";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(jakarta.variable, vazirmatn.variable)}
    >
      <body className={cn("antialiased", isRtl ? "font-fa" : "font-body")}>
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages}>
          <PageBackground />
          <Header />
          <main className="relative z-[1]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
