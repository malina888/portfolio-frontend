import { articleListSchema, articleSchema } from "./article";

// A real answer from GET /api/v1/articles (seed data).
const apiAnswer = [
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

const article = apiAnswer[0];

describe("articleListSchema", () => {
  describe("when the API answers with a list of articles", () => {
    it("accepts every article, in the same order", () => {
      const result = articleListSchema.safeParse(apiAnswer);

      expect(result.success).toBe(true);
      expect(result.data?.map(({ id }) => id)).toEqual(
        apiAnswer.map(({ id }) => id),
      );
    });
  });

  describe("when the API answers with an empty list", () => {
    it("accepts it", () => {
      expect(articleListSchema.safeParse([]).success).toBe(true);
    });
  });

  describe("when the answer is not a list", () => {
    it("rejects it", () => {
      expect(articleListSchema.safeParse({ articles: apiAnswer }).success).toBe(
        false,
      );
    });
  });

  describe("when one article in the list is broken", () => {
    it("rejects the whole list", () => {
      const answer = [article, { ...article, title: 42 }];

      expect(articleListSchema.safeParse(answer).success).toBe(false);
    });
  });
});

describe("articleSchema", () => {
  describe.each([
    "id",
    "title",
    "content",
    "publishedAt",
    "createdAt",
    "updatedAt",
  ])("when the %s field is missing", (field) => {
    it("rejects the article", () => {
      expect(
        articleSchema.safeParse({ ...article, [field]: undefined }).success,
      ).toBe(false);
    });
  });

  describe("when the id is not a UUID", () => {
    it("rejects the article", () => {
      expect(articleSchema.safeParse({ ...article, id: "123" }).success).toBe(
        false,
      );
    });
  });

  describe("when the title is empty", () => {
    it("rejects the article", () => {
      expect(articleSchema.safeParse({ ...article, title: "" }).success).toBe(
        false,
      );
    });
  });

  describe("when a date is not an ISO date", () => {
    it("rejects the article", () => {
      const answer = { ...article, publishedAt: "1 November 2026" };

      expect(articleSchema.safeParse(answer).success).toBe(false);
    });
  });

  describe("when the article has a field the schema does not know", () => {
    it("accepts the article and drops that field", () => {
      const result = articleSchema.safeParse({ ...article, author: "Maciej" });

      expect(result.success).toBe(true);
      expect(result.data).not.toHaveProperty("author");
    });
  });
});
