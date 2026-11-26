"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

const SESSION_KEY = "vihanga-preloader-seen";
const TYPED_LINE = "initializing portfolio…";

export function Preloader() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Proceed if sessionStorage is unavailable
    }

    setVisible(true);

    const typeInterval = window.setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= TYPED_LINE.length) {
          window.clearInterval(typeInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 18);

    const splitTimer = window.setTimeout(() => setSplitting(true), 1020);
    const closeTimer = window.setTimeout(() => setVisible(false), 1480);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearInterval(typeInterval);
      window.clearTimeout(splitTimer);
      window.clearTimeout(closeTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [shouldReduceMotion]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Portfolio intro sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            aria-hidden="true"
            initial={{ y: 0 }}
            animate={{ y: splitting ? "-100%" : 0 }}
            transition={{ duration: 0.44, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#07080a] border-b border-white/5"
          />

          <motion.div
            aria-hidden="true"
            initial={{ y: 0 }}
            animate={{ y: splitting ? "100%" : 0 }}
            transition={{ duration: 0.44, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#07080a] border-t border-white/5"
          />

          <motion.div
            animate={{ opacity: splitting ? 0 : 1, scale: splitting ? 0.98 : 1 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <div className="mb-4 flex items-center gap-2 font-mono-code text-xs tracking-wider text-[var(--accent)] sm:text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>{TYPED_LINE.slice(0, typedLength)}</span>
              <span className="inline-block h-3.5 w-[2px] animate-pulse bg-[var(--accent)]" />
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.32,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl"
              >
                {siteConfig.person.name}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.3 }}
              className="mt-2 font-mono-code text-xs text-[var(--text-secondary)]"
            >
              {siteConfig.person.shortTitle}
            </motion.p>
          </motion.div>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute right-6 bottom-6 z-20 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono-code text-xs text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-white"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
