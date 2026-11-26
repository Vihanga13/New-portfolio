"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "education", label: "Education", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export function AtmosphereEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState("01");
  const [activeLabel, setActiveLabel] = useState("Home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;

    const update = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(620px circle at ${targetX}px ${targetY}px, rgba(var(--accent-rgb), 0.075), transparent 65%)`;
      }
      rafId = 0;
    };

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = SECTIONS.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveIndex(match.index);
              setActiveLabel(match.label);
            }
          }
        }
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: 0.01 }
    );

    for (const sec of SECTIONS) {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[var(--accent)] accent-transition"
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
      />

      {!shouldReduceMotion && (
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-10 hidden md:block transition-opacity duration-500"
        />
      )}

      <div aria-hidden="true" className="film-grain" />

      <aside
        aria-label="Current section indicator"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
      >
        <span className="font-mono-code text-xs font-medium tracking-wider text-[var(--accent)]">
          {activeIndex}
        </span>
        <div className="flex flex-col items-center gap-2 py-1">
          {SECTIONS.map((sec) => {
            const isActive = sec.index === activeIndex;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                aria-label={`Jump to ${sec.label}`}
                title={sec.label}
                className="group flex items-center justify-center p-0.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-5 w-1.5 bg-[var(--accent)]"
                      : "h-1.5 w-1.5 bg-white/20 group-hover:bg-white/50"
                  }`}
                />
              </a>
            );
          })}
        </div>
        <span className="font-mono-code text-[11px] text-[var(--text-muted)]">
          07
        </span>
        <span className="mt-1 font-mono-code text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] [writing-mode:vertical-rl]">
          {activeLabel}
        </span>
      </aside>
    </>
  );
}
