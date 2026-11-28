export type AccentTheme = "lime" | "violet" | "cyan";

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  platform: "linkedin" | "github" | "portfolio";
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: "layout" | "server" | "smartphone" | "database" | "brain" | "wrench";
  span?: "wide" | "normal";
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  isEditablePlaceholder?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  partner: string;
  period: string;
  graduation: string;
  classification: string;
  location: string;
  highlights: string[];
  secondary: {
    qualification: string;
    institution: string;
    year: string;
    details: string;
  };
  certifications: CertificationItem[];
}

export interface SiteConfig {
  person: {
    name: string;
    firstName: string;
    lastName: string;
    initials: string;
    shortTitle: string;
    fullTitle: string;
    rotatingRoles: string[];
    greetings: string[];
    location: string;
    timezone: string;
    availability: {
      open: boolean;
      label: string;
    };
    portraitImage: string | null;
    portraitAlt: string;
    logoImage: string | null;
    cvPath: string;
    cvFileName: string;
  };
  seo: {
    title: string;
    description: string;
    siteUrl: string;
    keywords: string[];
  };
  hero: {
    headlinePrefix: string;
    headlineAccent: string;
    headlineSuffix: string;
    supportingText: string;
    codeSnippet: {
      role: string;
      stack: string[];
      location: string;
      openToWork: boolean;
    };
    floatingChips: string[];
  };
  about: {
    paragraphs: string[];
    highlights: {
      label: string;
      value: string;
      detail: string;
    }[];
  };
  contact: {
    heading: string;
    supportingText: string;
    email: string | null;
    phone: string | null;
    formspreeEndpoint: string | null;
    emailPlaceholderHint: string;
    location: string;
    formEndpointNote: string;
  };
  socials: SocialLink[];
  github: {
    username: string;
    profileUrl: string;
  };
  skills: SkillCategory[];
  marqueeRows: {
    top: string[];
    bottom: string[];
  };
  experience: ExperienceItem[];
  education: EducationItem;
  defaultAccent: AccentTheme;
}

/**
 * Central editable portfolio configuration.
 * Update personal details, availability, email, portrait, CV path,
 * experience entries, and skills here without touching UI components.
 */
export const siteConfig: SiteConfig = {
  person: {
    name: "Vihanga Nilusha",
    firstName: "Vihanga",
    lastName: "Nilusha",
    initials: "VN",
    shortTitle: "Software Engineer / Full-Stack Developer",
    fullTitle: "Software Engineer | Full-Stack Developer | Mobile App Developer",
    rotatingRoles: [
      "Full-Stack Developer",
      "Flutter Developer",
      "AI Integrator",
    ],
    greetings: ["Hello", "ආයුබෝවන්"],
    location: "Colombo, Sri Lanka",
    timezone: "Asia/Colombo",
    availability: {
      open: true,
      label: "Open to opportunities",
    },
    // Replace `null` with "/images/portrait.jpg" once you add a professional portrait in /public/images/
    portraitImage: "/images/portrait.jpg",
    portraitAlt: "Vihanga Nilusha — Software Engineer",
    logoImage: "/images/logo-vn.jpg",
    cvPath: "/cv/Vihanga-Nilusha-CV.pdf",
    cvFileName: "Vihanga-Nilusha-CV.pdf",
  },

  seo: {
    title: "Vihanga Nilusha — Software Engineer | Full-Stack & Mobile Developer",
    description:
      "Portfolio of Vihanga Nilusha, a Software Engineer in Sri Lanka specializing in Full-Stack Web Development, Flutter Mobile Applications, and AI-powered solutions.",
    siteUrl: "https://vihanganilusha-me.netlify.app",
    keywords: [
      "Vihanga Nilusha",
      "Software Engineer",
      "Full-Stack Developer",
      "Flutter Developer",
      "Next.js",
      "Colombo Sri Lanka",
      "Moratuwa Sri Lanka",
      "AI Applications",
    ],
  },

  hero: {
    headlinePrefix: "Building Digital Experiences That Make an ",
    headlineAccent: "Impact",
    headlineSuffix: ".",
    supportingText:
      "I'm Vihanga Nilusha, a Software Engineer passionate about building modern web applications, mobile experiences and intelligent AI-powered solutions. I transform ideas into functional, scalable and user-focused digital products.",
    codeSnippet: {
      role: "Software Engineer | Full-Stack & Mobile",
      stack: ["Next.js", "Flutter", "Node.js", "Laravel", "PyTorch"],
      location: "Moratuwa, Colombo, Sri Lanka",
      openToWork: true,
    },
    floatingChips: ["Next.js", "Flutter", "PyTorch", "Firebase"],
  },

  about: {
    paragraphs: [
      "I'm a Computer Science graduate with a Second Upper Division degree from NSBM Green University, in collaboration with the University of Plymouth. I enjoy developing digital products across web and mobile platforms, exploring new technologies and solving real-world problems through software.",
      "My experience includes working with modern frontend frameworks, backend technologies, APIs, databases and mobile application development. I particularly enjoy building complete solutions, from planning and designing interfaces to implementing functionality and integrating backend services.",
      "I'm continuously improving my technical skills and exploring opportunities to contribute to innovative software projects.",
    ],
    highlights: [
      {
        label: "Academic Degree",
        value: "BSc (Hons) Computer Science",
        detail: "NSBM Green University × University of Plymouth, UK",
      },
      {
        label: "Classification",
        value: "Second Class Upper Division",
        detail: "Graduated December 2025",
      },
      {
        label: "Core Platforms",
        value: "Web · Mobile · AI",
        detail: "End-to-end product engineering from UI to APIs",
      },
    ],
  },

  contact: {
    heading: "Have an idea? Let's build something meaningful.",
    supportingText:
      "I'm always interested in exploring exciting projects, collaborating with talented people and discussing new opportunities.",
    email: "vihaax23@gmail.com",
    phone: "+94 71 254 7892",
    formspreeEndpoint: "https://formspree.io/f/mqpqjnvz",
    emailPlaceholderHint: "Configure your email address in data/site.ts",
    location: "Moratuwa, Colombo, Sri Lanka",
    formEndpointNote:
      "Messages are sent directly via Formspree to Vihanga's inbox.",
  },

  socials: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/vihanga-nilusha",
      handle: "in/vihanga-nilusha",
      platform: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/Vihanga13",
      handle: "@Vihanga13",
      platform: "github",
    },
    {
      label: "Portfolio",
      href: "https://vihanganilusha-me.netlify.app/",
      handle: "vihanganilusha-me.netlify.app",
      platform: "portfolio",
    },
  ],

  github: {
    username: "Vihanga13",
    profileUrl: "https://github.com/Vihanga13",
  },

  skills: [
    {
      id: "frontend",
      title: "Frontend Development",
      subtitle: "Responsive, accessible interfaces and component systems",
      icon: "layout",
      span: "wide",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Bootstrap",
        "Responsive Web Design",
      ],
    },
    {
      id: "backend",
      title: "Backend & APIs",
      subtitle: "RESTful services, server logic, and API architecture",
      icon: "server",
      skills: [
        "Node.js",
        "Express.js",
        "PHP",
        "Laravel",
        "ASP.NET Core (.NET 9)",
        "C#",
        "RESTful API Design & Integration",
      ],
    },
    {
      id: "mobile",
      title: "Mobile Development",
      subtitle: "Cross-platform mobile apps with native-grade polish",
      icon: "smartphone",
      skills: ["Flutter", "Dart", "React Native", "Android Studio", "Firebase"],
    },
    {
      id: "database",
      title: "Database and Cloud",
      subtitle: "Relational, document, and offline-first persistence layers",
      icon: "database",
      skills: [
        "MySQL",
        "MongoDB",
        "Firebase Firestore",
        "Firebase Realtime DB",
        "SQLite",
      ],
    },
    {
      id: "ai",
      title: "AI, ML & Data",
      subtitle: "Model inference, vision pipelines, and LLM APIs",
      icon: "brain",
      skills: [
        "Python",
        "PyTorch",
        "Flask",
        "Groq API",
        "OpenCV2",
        "Data Cleaning & Preprocessing",
      ],
    },
    {
      id: "tools",
      title: "Tools and Workflow",
      subtitle: "Version control, containers, analytics, and delivery practices",
      icon: "wrench",
      span: "wide",
      skills: [
        "Git",
        "GitHub",
        "Docker",
        "Figma",
        "Postman",
        "Power BI",
        "Cloudflare",
        "WordPress",
        "Agile & Cross-Browser Testing",
      ],
    },
  ],

  marqueeRows: {
    top: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
      "Dart",
      "Node.js",
      "Laravel",
      "ASP.NET Core",
      "PHP",
    ],
    bottom: [
      "Python",
      "PyTorch",
      "Flask",
      "Groq API",
      "Firebase",
      "MongoDB",
      "MySQL",
      "Docker",
      "Git & GitHub",
      "WordPress",
    ],
  },

  experience: [
    {
      id: "stalion-lanka",
      role: "Web Developer",
      company: "Stalion Lanka Pvt Ltd",
      period: "Jul 2026 - Present",
      location: "Sri Lanka",
      type: "Full-Time · Web Development",
      isEditablePlaceholder: false,
      summary:
        "Developing and maintaining responsive, user-facing web applications with RESTful API integrations, authentication flows, and Git-based CI/CD delivery.",
      highlights: [
        "Develop and maintain responsive, user-facing web applications using modern JavaScript frameworks and component-based architecture.",
        "Build and integrate RESTful APIs to connect frontend interfaces with backend services and databases.",
        "Troubleshoot and resolve bugs across the stack, ensuring cross-browser compatibility and consistent UI/UX.",
        "Collaborate with designers, backend engineers, and project stakeholders to deliver features within Agile sprints.",
        "Implement authentication and authorization flows to secure application data and user access.",
        "Deploy and maintain web applications using Git-based version control and CI/CD workflows.",
      ],
      stack: [
        "React.js",
        "Next.js",
        "JavaScript",
        "RESTful APIs",
        "Authentication",
        "Git",
        "CI/CD",
      ],
    },
    {
      id: "altitude1",
      role: "Junior Web Developer",
      company: "Altitude1 Pvt (Ltd)",
      period: "Jun 2025 - Jun 2026",
      location: "Sri Lanka",
      type: "Full-Time · Full-Stack & Mobile",
      isEditablePlaceholder: false,
      summary:
        "Engineered full-stack web applications and cross-platform mobile interfaces across React.js, Node.js, Laravel, Flutter, and WordPress, while supporting branch administrative operations from Feb 2026.",
      highlights: [
        "Develop and maintain responsive web applications using React.js, Node.js, Laravel, and Flutter, building reusable UI components with a component-based architecture.",
        "Design and implement backend APIs using Node.js and Laravel, integrating REST APIs between frontend and backend systems for seamless data flow.",
        "Work with MySQL and MongoDB databases for data storage, retrieval, and integration with backend services.",
        "Develop and customize web applications using WordPress and Bootstrap frameworks.",
        "Debug, test, and optimize applications for performance, responsiveness, and cross-browser compatibility.",
        "Collaborate closely with designers and developers throughout the SDLC to deliver user-friendly, scalable web solutions.",
        "Since Feb 2026, also supported branch administrative operations, including documentation, coordination, and reporting, alongside continued full-time web development responsibilities.",
      ],
      stack: [
        "React.js",
        "Node.js",
        "Laravel",
        "Flutter",
        "WordPress",
        "Bootstrap",
        "MySQL",
        "MongoDB",
      ],
    },
  ],

  education: {
    degree: "BSc (Hons) Computer Science",
    institution: "NSBM Green University",
    partner: "University of Plymouth, United Kingdom",
    period: "2022 - 2025",
    graduation: "December 2025",
    classification: "Second Class Upper Division",
    location: "Sri Lanka",
    highlights: [
      "Awarded Second Class Upper Division honours in Computer Science (2022 - 2025).",
      "Independently developed the AI-Driven Nutritious App as the final-year Computer Science research and engineering project.",
      "Covered software engineering principles, full-stack systems, databases, and applied machine learning.",
    ],
    secondary: {
      qualification: "GCE Advanced Level — Mathematics Stream",
      institution: "Prince of Wales' College",
      year: "2021",
      details: "Physical Stream: C Pass in Physics, C Pass in ICT",
    },
    certifications: [
      {
        title: "Web Design for Beginners",
        issuer: "Open Learning Platform, University of Moratuwa",
        year: "2023",
      },
      {
        title: "Certificate in Software Development (Level 1) — Second Class Upper",
        issuer: "ATARI City Campus",
        year: "2019",
      },
    ],
  },

  defaultAccent: "lime",
};
