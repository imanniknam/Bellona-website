import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { jakarta, jetbrains, lahzeh } from "../fonts";
import { baseMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = baseMetadata("fa");

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default function FaLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="fa" fontVars={`${lahzeh.variable} ${jakarta.variable} ${jetbrains.variable}`}>{children}</SiteShell>;
}
