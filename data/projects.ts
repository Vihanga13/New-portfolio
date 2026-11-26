export type ProjectFrameType = "browser" | "phone" | "hybrid";

export interface ProjectItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  technologiesNote?: string;
  frameType: ProjectFrameType;
  badge?: string;
  isEditable?: boolean;
  /**
   * Path under /public (e.g. "/images/projects/skillforz.png").
   * Keep `null` to display the styled interactive placeholder mockup.
   */
  screenshot: string | null;
  secondaryScreenshot?: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  caseStudy: {
    overview: string;
    problem: string;
    responsibilities: string[];
    features: string[];
    challenges: string[];
    placeholderNotes?: string[];
  };
}

/**
 * Editable featured projects configuration.
 * Add real screenshots, repository links, live URLs, and extra technical details
 * here without modifying React components.
 */
export const projectsData: ProjectItem[] = [
  {
    id: "skillforz",
    number: "01",
    slug: "skillforz",
    title: "SkillForz",
    category: "Full-Stack Web Development / Personal Project",
    tagline:
      "Streamlined Sri Lankan recruitment portal & neo-brutalist Flutter companion",
    description:
      "SkillForz is a job portal platform inspired by Sri Lankan recruitment websites. It aims to connect job seekers and employers through a streamlined recruitment experience.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Flutter"],
    frameType: "hybrid",
    badge: "Personal Project",
    screenshot: null,
    secondaryScreenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "SkillForz is a comprehensive recruitment platform modeled around the real workflows of Sri Lankan job boards, supporting both candidates searching for roles and employers managing hiring pipelines. Alongside the Next.js web application, I am designing a Flutter mobile companion featuring a bold neo-brutalist visual direction.",
      problem:
        "Traditional local job boards often suffer from cluttered layouts, fragmented application tracking, and inconsistent mobile experiences for both candidates and recruiters.",
      responsibilities: [
        "Defining product requirements and user journeys for job seekers, employers, and administrators.",
        "Designing the UI system across the web portal and the neo-brutalist Flutter mobile app.",
        "Implementing responsive frontend interfaces with Next.js, React, and Tailwind CSS.",
      ],
      features: [
        "Job search and filtering",
        "Job detail pages",
        "Job seeker accounts",
        "Employer accounts",
        "Vacancy publishing",
        "Applicant management",
        "Interview management",
        "Admin dashboard",
      ],
      challenges: [
        "Structuring clear, low-friction flows across three distinct user roles (candidates, employers, and admins).",
        "Translating a clean web recruitment experience into a cohesive neo-brutalist Flutter mobile interface.",
      ],
    },
  },
  {
    id: "nutritious-app",
    number: "02",
    slug: "ai-driven-nutritious-app",
    title: "AI-Driven Nutritious App",
    category: "Artificial Intelligence / Mobile Application",
    tagline:
      "Independently developed final-year CS project for dietary monitoring",
    description:
      "An AI-powered mobile application developed as my final-year Computer Science project to support personalized dietary management and nutritional monitoring.",
    technologies: ["Flutter", "Dart", "Python", "PyTorch", "Flask", "Firebase"],
    frameType: "phone",
    badge: "Final-Year Solo Project",
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "Independently conceived, trained, and built as my BSc (Hons) Computer Science final-year project, this cross-platform Flutter app connects to a custom-trained PyTorch ML model served via a Flask API backend, storing meal recognition results and nutrition data in Firebase.",
      problem:
        "Manual calorie and meal logging creates high friction for everyday users, leading to inconsistent tracking and inaccurate nutritional awareness.",
      responsibilities: [
        "Independent end-to-end architecture, model training, API wrapping, and mobile implementation.",
        "Building and training the food recognition model using Python and PyTorch.",
        "Exposing inference endpoints via Flask and connecting them to a Flutter & Firebase mobile client.",
      ],
      features: [
        "Food image scanning",
        "AI-powered food recognition",
        "Nutritional information",
        "Personalized dietary management",
        "Firebase-based data storage",
        "Python-based machine learning model",
      ],
      challenges: [
        "Serving PyTorch vision predictions reliably from a Flask backend to a mobile Flutter client with responsive feedback.",
        "Designing a clear mobile capture and nutrition breakdown UI backed by real-time Firebase storage.",
      ],
    },
  },
  {
    id: "aigrow",
    number: "03",
    slug: "aigrow",
    title: "AiGROW",
    category: "Professional Web Development",
    tagline: "Responsive web engineering with user-focused interface delivery",
    description:
      "A professional website development project involving modern web development practices, responsive layouts and user-focused interface implementation.",
    technologies: [],
    technologiesNote: "Editable in data/projects.ts — add exact stack tags",
    frameType: "browser",
    badge: "Professional Project",
    isEditable: true,
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "A professional web development engagement focused on crafting responsive layouts, clean semantic markup, and user-focused interface implementation aligned with modern web standards.",
      problem:
        "Delivering a consistent, responsive, and approachable web experience across desktop, tablet, and mobile viewports.",
      responsibilities: [
        "Implementing responsive layouts and user-focused frontend interfaces.",
        "Applying modern web development practices for cross-device usability and visual consistency.",
        "Editable slot: add specific AiGROW modules and stack details in data/projects.ts.",
      ],
      features: [
        "Responsive multi-breakpoint web layout",
        "User-focused interface implementation",
        "Modern web engineering structure",
      ],
      challenges: [
        "Balancing visual clarity and responsive adaptability across screen sizes.",
      ],
      placeholderNotes: [
        "Add exact technologies, live link, and screenshots in data/projects.ts.",
      ],
    },
  },
  {
    id: "apptelic",
    number: "04",
    slug: "apptelic",
    title: "AppTelic",
    category: "Mobile Application Development",
    tagline:
      "Flutter app with Firebase Auth, GitHub OAuth & Groq AI integration",
    description:
      "A mobile application project involving Flutter development, authentication integration and AI-powered functionality.",
    technologies: ["Flutter", "Dart", "Firebase Authentication", "Groq API"],
    frameType: "phone",
    badge: "Mobile + AI",
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "AppTelic brings together cross-platform Flutter development, secure multi-provider authentication, and fast AI inference via the Groq API inside a focused mobile experience.",
      problem:
        "Combining streamlined developer-friendly sign-in flows with low-latency AI capabilities in a mobile client.",
      responsibilities: [
        "Developing the cross-platform mobile UI and application logic in Flutter and Dart.",
        "Integrating Firebase Authentication with GitHub login support.",
        "Connecting the application to the Groq API for AI-powered features.",
      ],
      features: [
        "Flutter mobile development",
        "Firebase authentication",
        "GitHub login integration",
        "Groq API integration",
        "AI-powered functionality",
      ],
      challenges: [
        "Coordinating OAuth redirect flows for GitHub login inside Firebase Authentication on mobile.",
        "Handling asynchronous Groq API responses gracefully with clean loading and error states.",
      ],
    },
  },
  {
    id: "thumblyapp",
    number: "05",
    slug: "thumblyapp",
    title: "ThumblyApp",
    category: "Web and Mobile Development",
    tagline: "Cross-platform web, mobile & dashboard engineering",
    description:
      "A professional development project involving web technologies, mobile application development and dashboard-related functionality.",
    technologies: [],
    technologiesNote: "Editable in data/projects.ts — add exact stack tags",
    frameType: "browser",
    badge: "Web & Mobile",
    isEditable: true,
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "A professional multi-surface project spanning web technologies, mobile application development, and dashboard functionality.",
      problem:
        "Supporting cohesive user workflows across web interfaces, mobile views, and operational dashboard screens.",
      responsibilities: [
        "Contributing to web, mobile, and dashboard-related interface and feature development.",
        "Editable slot: expand exact ThumblyApp responsibilities and technical stack in data/projects.ts.",
      ],
      features: [
        "Web application interface",
        "Mobile application development",
        "Dashboard-related functionality",
      ],
      challenges: [
        "Maintaining cohesive UX patterns across web, mobile, and dashboard surfaces.",
      ],
      placeholderNotes: [
        "Add exact description, technologies, and screenshots in data/projects.ts.",
      ],
    },
  },
  {
    id: "waste-glass-collection",
    number: "06",
    slug: "waste-glass-collection-system",
    title: "Waste Glass Collection System",
    category: "Full-Stack Mobile & Backend / Solo Project",
    tagline:
      "Offline-first Flutter & .NET 9 route optimization with GPS Haversine & barcode check-in",
    description:
      "Built a full-stack waste glass collection app with Dijkstra-based route optimization using real-world GPS distance calculation via the Haversine formula, barcode scanning for check-in, and offline-first data persistence with server sync.",
    technologies: [
      "ASP.NET Core (.NET 9)",
      "Flutter",
      "Firebase Firestore",
      "SQLite (sqflite)",
      "Docker",
      "Render",
    ],
    frameType: "phone",
    badge: "Solo Project",
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "An end-to-end logistics and waste glass collection platform pairing an offline-first Flutter mobile client with an ASP.NET Core (.NET 9) backend deployed via Docker and Render.",
      problem:
        "Field collection routes often operate in areas with intermittent connectivity while still needing accurate route ordering, check-in verification, and reliable server synchronization.",
      responsibilities: [
        "Designed and implemented the ASP.NET Core (.NET 9) backend and Docker deployment pipeline.",
        "Implemented Dijkstra-based route optimization backed by real-world GPS distance calculations via the Haversine formula.",
        "Built offline-first SQLite persistence with server sync and barcode scanning check-in in Flutter.",
      ],
      features: [
        "Dijkstra route optimization with Haversine GPS distances",
        "Barcode scanning check-in (mobile_scanner)",
        "Offline-first SQLite persistence",
        "Firebase Firestore & server synchronization",
        "Containerized ASP.NET Core (.NET 9) API",
      ],
      challenges: [
        "Reconciling offline local SQLite check-in mutations cleanly with remote server state upon reconnection.",
        "Integrating real-world GPS coordinate graphs into fast on-device/API Dijkstra path calculations.",
      ],
    },
  },
  {
    id: "medsync",
    number: "07",
    slug: "medsync",
    title: "MedSync",
    category: "Healthcare Software / Group Project",
    tagline:
      "Medical Information Management System (MIMS) with QR code identification",
    description:
      "Built a Medical Information Management System (MIMS) with QR code identification to modernize public healthcare, improving patient data management, workflow efficiency, and compliance.",
    technologies: ["PyQt5", "Firebase Realtime Database", "OpenCV2", "Python"],
    frameType: "browser",
    badge: "Group Project",
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "MedSync is a desktop Medical Information Management System designed to streamline public healthcare record handling using QR code patient identification and real-time cloud synchronization.",
      problem:
        "Paper-heavy or disconnected clinical records slow down patient intake and introduce lookup errors across public healthcare workflows.",
      responsibilities: [
        "Collaborated on system architecture and desktop UI workflows in PyQt5.",
        "Integrated OpenCV2-powered QR code scanning for rapid patient lookup.",
        "Connected clinical record updates to Firebase Realtime Database.",
      ],
      features: [
        "QR code patient identification via OpenCV2",
        "Real-time clinical data sync with Firebase",
        "Structured patient record management",
        "PyQt5 desktop interface",
      ],
      challenges: [
        "Achieving reliable real-time QR recognition across varying camera lighting conditions.",
      ],
    },
  },
  {
    id: "green-ride",
    number: "08",
    slug: "green-ride",
    title: "Green Ride",
    category: "Mobile Application / Group Project",
    tagline:
      "NSBM Green University transport & carpooling coordination app",
    description:
      "Developed a transportation app for NSBM Green University streamlining commuting through public transport details and carpooling coordination.",
    technologies: ["Dart", "Flutter", "Firebase"],
    frameType: "phone",
    badge: "Group Project",
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "Green Ride helps NSBM Green University students coordinate daily commutes by bringing public transport schedules and campus carpooling coordination into one Flutter app.",
      problem:
        "Students commuting to campus lacked a unified place to check transit options and coordinate shared rides with peers.",
      responsibilities: [
        "Built cross-platform mobile screens and navigation flows in Flutter and Dart.",
        "Integrated Firebase backend services for ride coordination and live updates.",
      ],
      features: [
        "Public transport route details",
        "Campus carpooling coordination",
        "Firebase real-time backend",
      ],
      challenges: [
        "Designing clear ride discovery and coordination flows for daily university commuters.",
      ],
    },
  },
  {
    id: "green-stay",
    number: "09",
    slug: "green-stay",
    title: "Green Stay",
    category: "Web Platform / Group Project",
    tagline:
      "Student hostel finder for NSBM in Homagama with Google Maps search",
    description:
      "Built a platform for NSBM students to find hostels in Homagama, integrating the Google Maps API for mapping and location-based search.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Google Maps API"],
    frameType: "browser",
    badge: "Group Project",
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: {
      overview:
        "Green Stay connects incoming and current NSBM students with verified hostel listings around Homagama using interactive Google Maps filtering and a PHP/MySQL backend.",
      problem:
        "Finding reliable student accommodation near campus often relied on word-of-mouth without clear distance or map context.",
      responsibilities: [
        "Developed responsive listing interfaces using HTML, CSS, and JavaScript.",
        "Integrated Google Maps API for interactive pin mapping and location-based search.",
        "Built server-side listing queries and persistence with PHP and MySQL.",
      ],
      features: [
        "Interactive Google Maps hostel mapping",
        "Location-based accommodation search",
        "PHP & MySQL listing management",
      ],
      challenges: [
        "Synchronizing map markers and filter state smoothly with MySQL-backed search results.",
      ],
    },
  },
];
