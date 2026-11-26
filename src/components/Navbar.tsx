"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Command, X } from "lucide-react";
import { AccentTheme, siteConfig } from "@/data/site";
import { useAccentTheme } from "./ThemeProvider";
import { MagneticButton } from "./ui/MagneticButton";

/**
 * NAVBAR CONCEPT: "It knows where you are"
 *
 * Desktop: plain text links with a single underline that slides to the section
 * you are reading, so the nav doubles as a "you are here" indicator. The
 * accent colour switcher is three visible dots, one click each, instead of
 * a hidden dropdown. Mobile: the menu opens as a full-screen list of huge
 * links, the same typographic language as the rest of the site.
 */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const ACCENT_OPTIONS: { id: AccentTheme; label: string; dot: string }[] = [
  { id: "lime", label: "Electric lime", dot: "#bef264" },
  { id: "violet", label: "Subtle violet", dot: "#a78bfa" },
  { id: "cyan", label: "Electric cyan", dot: "#22d3ee" },
];

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

function AccentSwitcher({
  accent,
  setAccent,
}: {
  accent: AccentTheme;
  setAccent: (a: AccentTheme) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Accent colour"
      className="flex items-center gap-2.5"
    >
      {ACCENT_OPTIONS.map((opt) => {
        const selected = accent === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setAccent(opt.id)}
            className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
              selected
                ? "border-white/70"
                : "border-transparent hover:border-white/30"
            }`}
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: opt.dot }}
            />
          </button>
        );
      })}
    </div>
  );
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const { accent, setAccent } = useAccentTheme();

  // Header background after scrolling a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    NAV_LINKS.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock page scroll and allow Escape while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#07080a]/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12"
        >
          <a
            href="#home"
            className="font-display text-base font-semibold tracking-tight text-white transition-colors hover:text-[var(--accent)]"
          >
            {siteConfig.person.name}
          </a>

          {/* Desktop links with one sliding underline */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`block py-2 text-sm transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden="true"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 36 }
                      }
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-[var(--accent)]"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <AccentSwitcher accent={accent} setAccent={setAccent} />
            </div>

            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command palette (Ctrl or Cmd + K)"
              className="hidden items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-white lg:flex"
            >
              <Command className="h-3.5 w-3.5" aria-hidden="true" />
              K
            </button>

            <MagneticButton
              href="#contact"
              className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] hover:bg-[var(--accent-bright)] accent-transition sm:inline-flex"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="text-sm font-medium text-white lg:hidden"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile: full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#07080a] px-4 pb-8 pt-5 sm:px-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold text-white">
                {siteConfig.person.name}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                autoFocus
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white"
              >
                Close
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <ul className="my-auto py-10">
              {NAV_LINKS.map((item, i) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: reduce ? 0 : 0.05 + i * 0.045,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      aria-current={isActive ? "location" : undefined}
                      className={`block py-1 font-display text-[clamp(2.5rem,12vw,4.5rem)] font-bold leading-[1.05] tracking-tight transition-colors ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-white hover:text-[var(--accent)]"
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-6">
              <AccentSwitcher accent={accent} setAccent={setAccent} />
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCommandPalette();
                }}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
              >
                <Command className="h-4 w-4" aria-hidden="true" />
                Command palette
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}