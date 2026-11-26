"use client";

import React from "react";
import { siteConfig } from "@/data/site";

/**
 * EDUCATION CONCEPT: "One statement, set big"
 *
 * Education is short, so it stays quiet and static. The degree is the headline
 * and the academic result is set as large outlined type that fills with the
 * accent colour on hover. No card, no glow, no icon tiles.
 */

export function EducationSection() {
  const edu = siteConfig.education;

  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-sm text-[var(--text-muted)] lg:col-span-4">
            Education
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] lg:col-span-8">
            The academic foundation behind the work: a Computer Science degree
            focused on building real software.
          </p>
        </div>

        <div className="border-t border-white/12 pt-12 sm:pt-16">
          <h3 className="max-w-5xl font-display text-[clamp(2.25rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-tight text-white">
            {edu.degree}
          </h3>

          <p
            className="mt-4 w-fit cursor-default font-display text-[clamp(1.75rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-tight text-transparent transition-colors duration-500 hover:text-[var(--accent)]"
            style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}
          >
            {edu.classification}
          </p>

          <dl className="mt-14 grid grid-cols-1 border-t border-white/12 sm:grid-cols-3">
            <div className="border-b border-white/12 py-6 sm:border-b-0 sm:border-r sm:pr-8">
              <dt className="text-sm text-[var(--text-muted)]">Studied at</dt>
              <dd className="mt-2 font-display text-xl font-semibold text-white">
                {edu.institution}
              </dd>
            </div>
            <div className="border-b border-white/12 py-6 sm:border-b-0 sm:border-r sm:px-8">
              <dt className="text-sm text-[var(--text-muted)]">
                In collaboration with
              </dt>
              <dd className="mt-2 font-display text-xl font-semibold text-white">
                {edu.partner}
              </dd>
            </div>
            <div className="py-6 sm:pl-8">
              <dt className="text-sm text-[var(--text-muted)]">Graduated</dt>
              <dd className="mt-2 font-display text-xl font-semibold text-white">
                {edu.graduation}
              </dd>
            </div>
          </dl>

          {edu.highlights.length > 0 && (
            <ul className="mt-10 max-w-2xl">
              {edu.highlights.map((item, i) => (
                <li
                  key={i}
                  className="border-t border-white/10 py-3.5 text-[0.95rem] leading-relaxed text-[var(--text-secondary)] last:border-b"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Secondary Education & Certifications */}
          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/12 pt-10 md:grid-cols-2">
            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Secondary Education · {edu.secondary.year}
              </p>
              <h4 className="mt-2 font-display text-xl font-semibold text-white">
                {edu.secondary.qualification}
              </h4>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {edu.secondary.institution}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {edu.secondary.details}
              </p>
            </div>

            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Additional Certifications
              </p>
              <ul className="mt-3">
                {edu.certifications.map((cert) => (
                  <li
                    key={cert.title}
                    className="border-t border-white/10 py-3 last:border-b"
                  >
                    <p className="font-display text-base font-semibold text-white">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                      {cert.issuer} · {cert.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}