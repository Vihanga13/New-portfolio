"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "./ui/ScrambleText";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 max-w-2xl"
    >
      <div className="mb-3 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
        <span className="font-mono-code text-xs font-semibold text-[var(--accent)]">
          {index}
        </span>
        <span className="h-3 w-px bg-white/15" aria-hidden="true" />
        <span className="font-mono-code text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          <ScrambleText text={eyebrow} />
        </span>
      </div>

      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </motion.div>
  );
}

