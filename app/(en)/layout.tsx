import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { jakarta, jetbrains } from "../fonts";
import { baseMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = baseMetadata("en");

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en" fontVars={`${jakarta.variable} ${jetbrains.variable}`}>{children}</SiteShell>;
}
