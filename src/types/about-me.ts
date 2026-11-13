export interface ExternalLink {
  label: string;
  url: string;
}

export interface Portrait {
  src: string;
  alt: string;
}

export interface Highlight {
  value: string;
  label: string;
}

export interface AchievementResult {
  place: string;
  description: string;
}

export interface Achievement {
  event: string;
  location: string;
  date: string;
  results: AchievementResult[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}
