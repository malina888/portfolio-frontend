import portrait from "@/assets/images/portrait.jpg";
import type {
  Achievement,
  ExternalLink,
  Highlight,
  Portrait,
  Project,
} from "@/types/about-me";

export const AUTHOR_NAME = "Maciej Malinowski";

export const AUTHOR_TAGLINE =
  "Beginner web developer and competitive lifesaver.";

export const AUTHOR_PORTRAIT: Portrait = {
  src: portrait,
  alt: "Portrait photo of Maciej Malinowski",
};

export const GITHUB_URL = "https://github.com/malina888";

export const ABOUT_ME =
  "I'm a fourth-year IT student at Technikum nr 4 im. Marii Skłodowskiej-Curie (ZSTiO) in Kędzierzyn-Koźle and a beginner programmer. Choosing an IT school made programming pretty much inevitable, so here I am. I'm doing an internship at Generacja Innowacja, where I'm learning how real web projects are built: a NestJS backend, a React front end, tests, CI and code review. Outside of code, I've been training lifesaving sport since 2021, competing for MUKS WOPR Kędzierzyn-Koźle.";

export const HIGHLIGHTS: Highlight[] = [
  { value: "Since 2021", label: "training lifesaving sport" },
  { value: "8", label: "podium places in 2026" },
  {
    value: "1st",
    label: "overall (junior), Polish Summer Lifesaving Championships 2026",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    event:
      "3rd National Project Competition of Centrum Mistrzostwa Informatycznego",
    location: "Łódź",
    date: "20 May 2023",
    results: [
      {
        place: "3rd",
        description: '"Raptory" category (team), programming Makeblock robots',
      },
    ],
  },
  {
    event: "59th Polish Summer Lifesaving Championships",
    location: "Szczecin",
    date: "6–7 June 2026",
    results: [
      { place: "1st", description: "Overall classification (junior)" },
      { place: "3rd", description: "100 m Manikin Carry with Fins" },
      { place: "3rd", description: "200 m Super Lifesaver" },
      { place: "3rd", description: "200 m Obstacle Swim" },
    ],
  },
  {
    event: "Polish Lifesaving Cup",
    location: "Skierniewice",
    date: "20 June 2026",
    results: [
      { place: "3rd", description: "Overall classification (junior)" },
      { place: "2nd", description: "50 m Manikin Tow with Fins" },
      { place: "3rd", description: "50 m Rescue Medley" },
    ],
  },
  {
    event: "Polish Lifesaving Grand Prix 2026",
    location: "Kędzierzyn-Koźle",
    date: "10 October 2026",
    results: [
      { place: "2nd", description: "Open 4 × 50 m Obstacle Relay (team)" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "blog-backend",
    description:
      "The backend for my blog, built with NestJS and TypeScript. My first backend project; the articles API is coming next.",
    url: "https://github.com/malina888/blog-backend",
    technologies: ["NestJS", "TypeScript"],
  },
  {
    name: "portfolio-frontend",
    description:
      "This website. Built with React, Tailwind CSS and the Athena component library, tested with Vitest and Playwright.",
    url: "https://github.com/malina888/portfolio-frontend",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vitest",
      "Playwright",
    ],
  },
];

export const CURRENTLY_LEARNING: string[] = [
  "HTML",
  "CSS",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "NestJS",
  "Git",
  "Testing (Vitest, Playwright)",
];

export const INTERESTS: string[] = [
  "Technology & PC hardware",
  "Gaming",
  "Healthy lifestyle",
  "Sport",
];

export const CONTACT_LINKS: ExternalLink[] = [
  { label: "GitHub", url: GITHUB_URL },
];

export const CONTACT_TEXT = "Want to see what I'm building? Find me here:";
