"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Command, Menu, Palette, X } from "lucide-react";
import { AccentTheme, siteConfig } from "@/data/site";
import { useAccentTheme } from "./ThemeProvider";
import { MagneticButton } from "./ui/MagneticButton";
import { ScrambleText } from "./ui/ScrambleText";

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
  { id: "lime", label: "Electric Lime", dot: "#bef264" },
  { id: "violet", label: "Subtle Violet", dot: "#a78bfa" },
  { id: "cyan", label: "Electric Cyan", dot: "#22d3ee" },
];

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteMenuOpen, setPaletteMenuOpen] = useState(false);
  const { accent, setAccent } = useAccentTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#07080a]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand mark */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] font-display text-sm font-bold tracking-tight text-white transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            {siteConfig.person.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-white sm:inline-block">
            {siteConfig.person.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm text-[var(--text-secondary)] transition hover:bg-white/[0.04] hover:text-white"
              >
                <ScrambleText text={item.label} />
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Accent theme switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPaletteMenuOpen((v) => !v)}
              aria-label="Switch accent theme"
              aria-expanded={paletteMenuOpen}
              className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 text-xs text-[var(--text-secondary)] transition hover:border-white/25 hover:text-white"
            >
              <span
                className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] accent-transition"
                aria-hidden="true"
              />
              <Palette className="h-3.5 w-3.5 hidden sm:block" />
            </button>

            {paletteMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-44 rounded-xl border border-white/12 bg-[#0d0f14]/95 p-1.5 shadow-2xl backdrop-blur-xl"
              >
                <p className="px-2.5 py-1 font-mono-code text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  Accent Theme
                </p>
                {ACCENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={accent === opt.id}
                    onClick={() => {
                      setAccent(opt.id);
                      setPaletteMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                      accent === opt.id
                        ? "bg-white/10 text-white"
                        : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: opt.dot }}
                      />
                      {opt.label}
                    </span>
                    {accent === opt.id && (
                      <span className="font-mono-code text-[10px] text-[var(--accent)]">
                        ON
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Command Palette trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette (Ctrl or Cmd + K)"
            className="hidden h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 font-mono-code text-xs text-[var(--text-secondary)] transition hover:border-white/25 hover:text-white sm:flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>

          {/* Highlighted Let's Talk CTA */}
          <MagneticButton
            href="#contact"
            className="hidden rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-fg)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.22)] hover:bg-[var(--accent-bright)] sm:inline-flex accent-transition"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="border-b border-white/10 bg-[#07080a]/95 px-4 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[var(--text-secondary)] transition hover:bg-white/[0.05] hover:text-white"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenCommandPalette();
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5 font-mono-code text-xs text-white"
            >
              <Command className="h-3.5 w-3.5" />
              Command Palette
            </button>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] px-3 py-2.5 text-xs font-semibold text-[var(--accent-fg)]"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
