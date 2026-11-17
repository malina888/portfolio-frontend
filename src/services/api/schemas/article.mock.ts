import type { Article } from "./article";

// Articles from the API seed data, newest first, for tests and stories.
export const MOCK_ARTICLES: Article[] = [
  {
    id: "5e1f0a2b-0003-4000-8000-000000000003",
    title: "What I learned about databases",
    content: "Tables, migrations and seed data explained simply.",
    publishedAt: "2026-11-01T08:00:00.000Z",
    createdAt: "2026-11-16T23:05:10.775Z",
    updatedAt: "2026-11-17T10:17:23.373Z",
  },
  {
    id: "5e1f0a2b-0004-4000-8000-000000000004",
    title: "My first API endpoint",
    content: "Building a read API with Nest.js and Prisma.",
    publishedAt: "2026-11-01T08:00:00.000Z",
    createdAt: "2026-11-16T23:05:10.778Z",
    updatedAt: "2026-11-17T10:17:23.375Z",
  },
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "Setting up a development environment",
    content: "Docker, Node.js and a database running on my machine.",
    publishedAt: "2026-10-01T08:00:00.000Z",
    createdAt: "2026-11-16T23:05:10.773Z",
    updatedAt: "2026-11-17T10:17:23.370Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world",
    content: "This is the first article on my blog.",
    publishedAt: "2026-09-01T08:00:00.000Z",
    createdAt: "2026-11-16T23:05:10.742Z",
    updatedAt: "2026-11-17T10:17:23.337Z",
  },
];
