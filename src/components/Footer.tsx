"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const fillWidth = useTransform(scrollYProgress, [0.15, 0.95], ["0%", "100%"]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#060709] pt-16 pb-10"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-sm font-semibold text-white">
              {siteConfig.person.name}
            </p>
            <p className="mt-1 font-mono-code text-xs text-[var(--text-secondary)]">
              Designed &amp; built in Colombo, Sri Lanka
            </p>
          </div>

          <div className="flex items-center gap-3">
            {siteConfig.socials
              .filter((s) => s.platform !== "portfolio")
              .map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-white"
                >
                  {social.platform === "github" ? (
                    <Github className="h-4 w-4" />
                  ) : (
                    <Linkedin className="h-4 w-4" />
                  )}
                </a>
              ))}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 font-mono-code text-xs text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Giant Outlined "VIHANGA" Wordmark that fills with accent on scroll */}
        <div className="relative mt-14 flex select-none justify-center overflow-hidden py-2">
          <div className="relative w-fit">
            <span
              aria-hidden="true"
              className="block whitespace-nowrap font-display text-[15vw] font-bold leading-none tracking-tighter text-transparent sm:text-[13vw] lg:text-[148px]"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.16)",
              }}
            >
              VIHANGA
            </span>

            <motion.div
              aria-hidden="true"
              style={{
                width: shouldReduceMotion ? "100%" : fillWidth,
              }}
              className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
            >
              <span className="block whitespace-nowrap font-display text-[15vw] font-bold leading-none tracking-tighter text-[var(--accent)] sm:text-[13vw] lg:text-[148px]">
                VIHANGA
              </span>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/[0.06] pt-6 font-mono-code text-[11px] text-[var(--text-muted)] sm:flex-row">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.person.name}. All rights
            reserved.
          </span>
          <span>Ctrl / ⌘ + K for Command Palette</span>
        </div>
      </div>
    </footer>
  );
}
