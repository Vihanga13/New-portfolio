"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/site";

/**
 * GITHUB CONCEPT: "The dial"
 *
 * Recent public activity is drawn as a ring of rays, like a clock face.
 * Every ray is one day, starting at the top and going clockwise; longer rays
 * are busier days. The rays shoot outwards once when the dial scrolls into
 * view. The total event count sits in the middle. Languages are set as big
 * percentages, repositories as a plain two-column list.
 * All data comes from the real /api/github route. Nothing is invented.
 */

interface GitHubPayload {
  available: boolean;
  error?: string;
  profile?: {
    login: string;
    name: string;
    avatarUrl: string;
    bio: string | null;
    publicRepos: number;
    followers: number;
    htmlUrl: string;
  };
  languages?: {
    name: string;
    count: number;
    percentage: number;
  }[];
  repositories?: {
    id: number;
    name: string;
    description: string | null;
    url: string;
    language: string | null;
    stars: number;
    forks: number;
    updatedAt: string;
  }[];
  recentActivity?: {
    date: string;
    count: number;
  }[];
  recentEventCount?: number;
}

const CENTER = 200;
const INNER_RADIUS = 92;
const MAX_RAY = 96;

function ActivityDial({
  activity,
  total,
  reduce,
}: {
  activity: { date: string; count: number }[];
  total: number;
  reduce: boolean;
}) {
  const maxCount = Math.max(1, ...activity.map((d) => d.count));

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label={`Ring chart of daily public GitHub activity: ${total} events over the last ${activity.length} days.`}
        className="h-full w-full"
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS - 10}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        {activity.map((day, i) => {
          const angle = (i / activity.length) * Math.PI * 2 - Math.PI / 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const length =
            day.count === 0 ? 3 : 12 + (day.count / maxCount) * MAX_RAY;
          const x1 = CENTER + cos * INNER_RADIUS;
          const y1 = CENTER + sin * INNER_RADIUS;
          const x2 = CENTER + cos * (INNER_RADIUS + length);
          const y2 = CENTER + sin * (INNER_RADIUS + length);

          return (
            <motion.line
              key={day.date}
              x1={x1}
              y1={y1}
              initial={reduce ? false : { x2: x1, y2: y1 }}
              whileInView={{ x2, y2 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: reduce ? 0 : i * 0.02,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              x2={x2}
              y2={y2}
              stroke={
                day.count === 0 ? "rgba(255,255,255,0.22)" : "var(--accent)"
              }
              strokeWidth="5"
              strokeLinecap="round"
            >
              <title>{`${day.date}: ${day.count} public event${
                day.count === 1 ? "" : "s"
              }`}</title>
            </motion.line>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-6xl font-bold leading-none text-white sm:text-7xl">
          {total}
        </span>
        <span className="mt-2 max-w-[8rem] text-sm leading-snug text-[var(--text-secondary)]">
          public {total === 1 ? "event" : "events"} in the last six weeks
        </span>
      </div>
    </div>
  );
}

export function GitHubSection() {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const [data, setData] = useState<GitHubPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((res) => res.json())
      .then((json: GitHubPayload) => {
        if (active) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setData({
            available: false,
            error: "Could not load live GitHub data.",
          });
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const activity = data?.recentActivity ?? [];
  const languages = data?.languages ?? [];
  const repositories = data?.repositories ?? [];
  const totalEvents = data?.recentEventCount ?? 0;

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-sm text-[var(--text-muted)] lg:col-span-4">
            GitHub
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:col-span-8">
            <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
              Live from the GitHub API: my public repositories and recent
              activity, exactly as they are.
            </p>
            <a
              href={siteConfig.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              github.com/{siteConfig.github.username}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {loading ? (
          <p
            role="status"
            className="flex items-center gap-3 border-t border-white/12 py-12 text-sm text-[var(--text-secondary)]"
          >
            <Loader2
              className="h-4 w-4 animate-spin text-[var(--accent)]"
              aria-hidden="true"
            />
            Loading repositories from GitHub...
          </p>
        ) : !data?.available ? (
          <div className="border-t border-white/12 py-12">
            <h3 className="font-display text-xl font-semibold text-white">
              The live GitHub feed is not available right now
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
              {data?.error ||
                "GitHub returned an error, possibly a rate limit."}{" "}
              You can still browse every repository on my GitHub profile.
            </p>
            <a
              href={siteConfig.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Open my GitHub profile
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div>
            {/* Dial + languages */}
            <div className="grid grid-cols-1 items-center gap-14 border-t border-white/12 pt-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                {activity.length > 0 ? (
                  <>
                    <ActivityDial
                      activity={activity}
                      total={totalEvents}
                      reduce={reduce}
                    />
                    <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
                      One ray per day, starting at the top and going clockwise.
                      Source: GitHub&apos;s public events API for @
                      {data.profile?.login}.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    GitHub returned no public events for this period.
                  </p>
                )}
              </div>

              <div className="lg:col-span-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-white">
                    Languages
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {data.profile?.publicRepos ?? 0} public repositories
                  </p>
                </div>

                {languages.length > 0 ? (
                  <ul className="border-b border-white/12">
                    {languages.map((lang) => (
                      <li
                        key={lang.name}
                        className="group flex items-baseline justify-between gap-6 border-t border-white/12 py-4"
                      >
                        <span className="text-lg text-white">
                          {lang.name}
                          <span className="ml-3 text-sm text-[var(--text-muted)]">
                            {lang.count} {lang.count === 1 ? "repo" : "repos"}
                          </span>
                        </span>
                        <span
                          className="font-display text-4xl font-bold leading-none text-transparent transition-colors duration-500 group-hover:text-[var(--accent)] sm:text-5xl"
                          style={{
                            WebkitTextStroke: "1.5px rgba(255,255,255,0.4)",
                          }}
                        >
                          {lang.percentage}%
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    The language breakdown will appear once public repositories
                    with detected languages exist.
                  </p>
                )}
              </div>
            </div>

            {/* Repositories: plain two-column list */}
            {repositories.length > 0 && (
              <div className="mt-20">
                <h3 className="mb-6 font-display text-xl font-semibold text-white">
                  Repositories
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
                  {repositories.map((repo) => (
                    <li key={repo.id} className="border-t border-white/12">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block py-5"
                      >
                        <span className="flex items-baseline justify-between gap-4">
                          <span className="font-display text-lg font-semibold text-white transition-colors group-hover:text-[var(--accent)]">
                            {repo.name}
                          </span>
                          <span className="flex shrink-0 items-center gap-3 text-sm text-[var(--text-muted)]">
                            {repo.language || "Repository"}
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                        <span className="mt-1.5 line-clamp-1 block text-sm text-[var(--text-secondary)]">
                          {repo.description || "No description provided."}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}