import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export const revalidate = 3600;

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  homepage: string | null;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

export async function GET() {
  const username = siteConfig.github.username;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vihanga-portfolio-app",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      ),
      fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!userRes.ok) {
      return NextResponse.json(
        {
          available: false,
          error: `GitHub API returned status ${userRes.status}`,
        },
        { status: 502 }
      );
    }

    const user = await userRes.json();
    const reposData: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];
    const eventsData: GitHubEvent[] = eventsRes.ok ? await eventsRes.json() : [];

    const ownRepos = reposData.filter((r) => !r.fork);

    const langCounts: Record<string, number> = {};
    for (const repo of ownRepos) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    }
    const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalLangRepos
          ? Math.round((count / totalLangRepos) * 100)
          : 0,
      }));

    const featuredRepos = [...ownRepos]
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.updated_at,
      }));

    const activityMap: Record<string, number> = {};
    for (const ev of eventsData) {
      const day = ev.created_at.slice(0, 10);
      activityMap[day] = (activityMap[day] || 0) + 1;
    }

    const today = new Date();
    const recentDays: { date: string; count: number }[] = [];
    for (let i = 41; i >= 0; i--) {
      const d = new Date(today);
      d.setUTCDate(today.getUTCDate() - i);
      const iso = d.toISOString().slice(0, 10);
      recentDays.push({ date: iso, count: activityMap[iso] || 0 });
    }

    return NextResponse.json({
      available: true,
      profile: {
        login: user.login,
        name: user.name || siteConfig.person.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        publicRepos: user.public_repos,
        followers: user.followers,
        htmlUrl: user.html_url,
      },
      languages,
      repositories: featuredRepos,
      recentActivity: recentDays,
      recentEventCount: eventsData.length,
    });
  } catch {
    return NextResponse.json(
      {
        available: false,
        error: "Unable to reach the GitHub API right now.",
      },
      { status: 503 }
    );
  }
}
