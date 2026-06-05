import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { PageBackground } from "@/components/ui/PageBackground";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `Bellona — ${BRAND.tagline}`, template: `%s | Bellona` },
  description:
    "Bellona designs AI agents, automations, and intelligent systems that replace repetitive work and help businesses scale faster.",
  keywords: ["AI automation", "AI agents", "workflow automation", "AI agency"],
  icons: { icon: "/bellona-icon.png", apple: "/bellona-icon.png" },
  openGraph: {
    title: `Bellona — ${BRAND.tagline}`,
    description: "Build Your AI Workforce with Bellona.",
    type: "website",
    siteName: "Bellona",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased font-body">
        <PageBackground />
        <LoadingScreen />
        <Header />
        <main className="relative z-[1]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
