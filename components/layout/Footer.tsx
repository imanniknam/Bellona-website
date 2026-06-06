"use client";

import { Github, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { BRAND, FOOTER_ITEMS } from "@/lib/constants";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: XIcon, href: "#", label: "X" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tBrand = useTranslations("brand");

  return (
    <footer className="relative z-[1] border-t border-white/[0.1] bg-gradient-to-b from-bellona-navy/80 to-bellona-black backdrop-blur-sm">
      <div className="container-bellona px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <Logo variant="icon" showWordmark />
            <p className="text-sm text-bellona-muted mt-4 max-w-xs">
              {tBrand("tagline")}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {FOOTER_ITEMS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-bellona-muted hover:text-bellona-white transition-colors duration-500"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-bellona-muted hover:text-bellona-cyan hover:border-bellona-cyan/20 transition-all duration-500"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-bellona-muted">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.name}. {t("rights")}
          </p>
          <div className="flex gap-6">
            <a
              href={`mailto:${BRAND.email}`}
              className="hover:text-bellona-white transition-colors"
            >
              {BRAND.email}
            </a>
            <a href="#" className="hover:text-bellona-white transition-colors">
              {t("privacy")}
            </a>
            <a href="#" className="hover:text-bellona-white transition-colors">
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
