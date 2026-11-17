import { expect, type Page, test } from "@playwright/test";

// What GET /api/v1/articles answers, newest first. CI does not run the API,
// so every test here answers in its place.
const ARTICLES = [
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

const LONG_TITLE =
  "Averyveryverylongarticletitlewithoutanyspacesthatmustwrapinsteadofmakingthepagescrollsideways";

const answerWithArticles = (page: Page, articles: typeof ARTICLES) =>
  page.route("**/api/v1/articles", (route) =>
    route.fulfill({ json: articles }),
  );

test.describe("Given the API has articles", () => {
  test.beforeEach(async ({ page }) => {
    await answerWithArticles(page, ARTICLES);
    await page.goto("/");
  });

  test("When a visitor opens the home page, Then the blog shows every article, newest first, with its title and date", async ({
    page,
  }) => {
    const blog = page.getByRole("region", { name: "Blog" });

    await expect(blog.getByRole("heading", { level: 3 })).toHaveText(
      ARTICLES.map(({ title }) => title),
    );
    await expect(blog.locator("time")).toHaveText([
      "1 November 2026",
      "1 November 2026",
      "1 October 2026",
      "1 September 2026",
    ]);
  });
});

test.describe("Given an article with a very long title and a phone screen 360 px wide", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await answerWithArticles(page, [{ ...ARTICLES[0], title: LONG_TITLE }]);
    await page.goto("/");
  });

  test("When a visitor opens the home page, Then the title wraps and the page never scrolls sideways", async ({
    page,
  }) => {
    const title = page.getByRole("heading", { level: 3, name: LONG_TITLE });
    await expect(title).toBeVisible();

    const box = await title.boundingBox();
    const scrollsSideways = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );

    expect(box && box.x + box.width).toBeLessThanOrEqual(360);
    expect(scrollsSideways).toBe(false);
  });
});
