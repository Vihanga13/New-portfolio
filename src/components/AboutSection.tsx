"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

/**
 * ABOUT CONCEPT: "Read it as you scroll"
 *
 * One memorable element: the opening paragraph is set huge and every word
 * lights up as you scroll through it, so the section is read, not skimmed.
 * No cards, no counters, no icon tiles. Facts are plain text.
 */

function Word({
  word,
  index,
  total,
  progress,
  reduce,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = (index / total) * 0.88;
  const opacity = useTransform(progress, [start, start + 0.12], [0.2, 1]);
  return (
    <motion.span style={reduce ? undefined : { opacity }}>{word} </motion.span>
  );
}

export function AboutSection() {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const [imgError, setImgError] = useState(false);
  const showPortrait = Boolean(siteConfig.person.portraitImage) && !imgError;

  const leadRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: leadRef,
    offset: ["start 0.8", "end 0.45"],
  });

  const [lead, ...others] = siteConfig.about.paragraphs;
  const leadWords = lead.split(" ");
  const initials = siteConfig.person.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: portrait, stays in view while the text scrolls */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="mb-6 text-sm text-[var(--text-muted)]">
                About me
              </h2>

              <div className="relative mx-auto max-w-[22rem] lg:mx-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-[var(--accent)] opacity-50"
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/15 bg-[#0c0e12]">
                  {showPortrait ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={siteConfig.person.portraitImage!}
                      alt={siteConfig.person.portraitAlt}
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover object-top grayscale transition duration-500 hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                      <span
                        aria-hidden="true"
                        className="font-display text-[7rem] font-bold leading-none text-transparent"
                        style={{
                          WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                        }}
                      >
                        {initials}
                      </span>
                      <p className="text-xs text-[var(--text-muted)]">
                        Portrait placeholder. Add your photo in data/site.ts.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-[var(--text-secondary)] lg:text-left">
                {siteConfig.person.location}
              </p>
            </div>
          </div>

          {/* Right: the story */}
          <div className="lg:col-span-8">
            <p
              ref={leadRef}
              className="font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-tight text-white"
            >
              {leadWords.map((word, i) => (
                <Word
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  total={leadWords.length}
                  progress={scrollYProgress}
                  reduce={reduce}
                />
              ))}
            </p>

            <div className="mt-12 max-w-2xl space-y-5 text-base leading-relaxed text-[var(--text-secondary)]">
              {others.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Plain facts, separated by hairlines instead of cards */}
            <dl className="mt-16 grid grid-cols-1 border-t border-white/12 sm:grid-cols-2">
              <div className="border-b border-white/12 py-7 sm:border-b-0 sm:border-r sm:pr-8">
                <dt className="text-sm text-[var(--text-muted)]">Studied</dt>
                <dd className="mt-2 font-display text-xl font-semibold text-white">
                  {siteConfig.education.degree}
                </dd>
                <dd className="mt-1 text-sm text-[var(--text-secondary)]">
                  {siteConfig.education.institution}, with the University of
                  Plymouth, UK
                </dd>
                <dd className="mt-2 text-sm text-[var(--accent)]">
                  {siteConfig.education.classification},{" "}
                  {siteConfig.education.graduation}
                </dd>
              </div>

              <div className="py-7 sm:pl-8">
                <dt className="text-sm text-[var(--text-muted)]">
                  Worked on
                </dt>
                <dd className="mt-2 font-display text-xl font-semibold text-white">
                  Real websites, client projects and mobile apps
                </dd>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Production websites, admin dashboards, REST APIs and
                  cross-platform Flutter apps.
                </dd>
                <dd className="mt-2">
                  <a
                    href="#experience"
                    className="group inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    See my experience
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}