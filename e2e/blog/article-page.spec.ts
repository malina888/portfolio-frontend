import { expect, type Page, test } from "@playwright/test";

// Many paragraphs, so the article page is longer than the screen. On a short
// page "opens at the top" would pass even if the page kept the old position.
const PARAGRAPHS = Array.from(
  { length: 30 },
  (_, index) =>
    `Paragraph ${index + 1}: Docker, Node.js and a database running on my machine.`,
);

const ARTICLE = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "Setting up a development environment",
  content: PARAGRAPHS.join("\n\n"),
  publishedAt: "2026-10-01T08:00:00.000Z",
  createdAt: "2026-11-16T23:05:10.773Z",
  updatedAt: "2026-11-17T10:17:23.370Z",
};

// What the API answers. CI does not run the API, so every test here answers
// in its place.
const answerWithArticles = async (page: Page) => {
  await page.route("**/api/v1/articles", (route) =>
    route.fulfill({ json: [ARTICLE] }),
  );
  await page.route(`**/api/v1/articles/${ARTICLE.id}`, (route) =>
    route.fulfill({ json: ARTICLE }),
  );
};

const scrollPosition = (page: Page) => page.evaluate(() => window.scrollY);

test.describe("Given the API has articles", () => {
  test.beforeEach(async ({ page }) => {
    await answerWithArticles(page);
  });

  test("When a visitor picks an article in the blog section, Then its page opens at the top without reloading the app, And Back returns to the same place on the about me page", async ({
    page,
  }) => {
    await page.goto("/");
    const link = page
      .getByRole("region", { name: "Blog" })
      .getByRole("link", { name: ARTICLE.title });
    await link.scrollIntoViewIfNeeded();
    const positionOnHomePage = await scrollPosition(page);
    expect(positionOnHomePage).toBeGreaterThan(0);
    // A mark on the window disappears if the whole app is loaded again.
    await page.evaluate(() => Object.assign(window, { notReloaded: true }));

    await link.click();

    await expect(page).toHaveURL(`/articles/${ARTICLE.id}`);
    await expect(
      page.getByRole("heading", { level: 1, name: ARTICLE.title }),
    ).toBeVisible();
    await expect(page.getByRole("article").locator("p")).toHaveText(PARAGRAPHS);
    await expect.poll(() => scrollPosition(page)).toBe(0);
    expect(await page.evaluate(() => "notReloaded" in window)).toBe(true);

    await page.goBack();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("region", { name: "Blog" })).toBeVisible();
    await expect.poll(() => scrollPosition(page)).toBe(positionOnHomePage);
  });

  test("When a visitor opens an article's address directly, Then the article loads", async ({
    page,
  }) => {
    await page.goto(`/articles/${ARTICLE.id}`);

    await expect(
      page.getByRole("heading", { level: 1, name: ARTICLE.title }),
    ).toBeVisible();
    await expect(page.getByRole("article").locator("p")).toHaveText(PARAGRAPHS);
    await expect(
      page.getByRole("link", { name: "Back to the about me page" }),
    ).toBeVisible();
  });
});
