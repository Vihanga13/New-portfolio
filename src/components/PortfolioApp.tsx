"use client";

import React, { useEffect, useState } from "react";
import { LayoutGroup, MotionConfig } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { Preloader } from "./Preloader";
import { AtmosphereEffects } from "./AtmosphereEffects";
import { Navbar } from "./Navbar";
import { CommandPalette } from "./CommandPalette";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { TechMarquee } from "./TechMarquee";
import { SkillsSection } from "./SkillsSection";
import { TerminalSection } from "./TerminalSection";
import { ProjectsSection } from "./ProjectsSection";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { GitHubSection } from "./GitHubSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

export function PortfolioApp() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  // Global Ctrl/Cmd + K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <Preloader />
        <AtmosphereEffects />
        <Navbar onOpenCommandPalette={() => setCommandOpen(true)} />

        <main id="main-content" className="relative z-20">
          <HeroSection />
          <TechMarquee />
          <AboutSection />
          <SkillsSection />
          <TerminalSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <ExperienceSection />
          <EducationSection />
          <GitHubSection />
          <ContactSection />
        </main>

        <Footer />

        <CommandPalette
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          onSelectProject={setSelectedProject}
        />

        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </LayoutGroup>
    </MotionConfig>
  );
}
