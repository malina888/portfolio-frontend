import { expect, type Locator, type Page, test } from "@playwright/test";

const AUTHOR_NAME = "Maciej Malinowski";
const READING_WIDTH = 768;

const getBox = async (locator: Locator) => {
  const box = await locator.boundingBox();

  if (!box) {
    throw new Error("The element is not visible on the page");
  }

  return box;
};

const scrollsSideways = (page: Page) =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

test.describe("Given a visitor opens the home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Then the page shows the author's name as its main heading", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(AUTHOR_NAME);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      AUTHOR_NAME,
    );
  });

  test("Then every image has a text alternative or is marked as decorative", async ({
    page,
  }) => {
    await expect(
      page.getByRole("img", { name: `Portrait photo of ${AUTHOR_NAME}` }),
    ).toBeVisible();

    for (const image of await page.locator("img").all()) {
      await expect(image).toHaveAttribute("alt");
    }
  });
});

test.describe("Given a phone screen 360 px wide", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("When the visitor opens the home page, Then the page never scrolls sideways", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
    expect(await scrollsSideways(page)).toBe(false);
  });

  test("When the name is a very long word, Then it wraps instead of overflowing", async ({
    page,
  }) => {
    const heading = page.getByRole("heading", { level: 1 });

    await heading.evaluate((element) => {
      element.textContent = "Averyveryverylongnamewithoutanyspaces".repeat(3);
    });

    const box = await getBox(heading);

    expect(box.x + box.width).toBeLessThanOrEqual(360);
    expect(await scrollsSideways(page)).toBe(false);
  });
});

test.describe("Given a wide screen 1440 px wide", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("When the visitor opens the home page, Then the content stays at a comfortable reading width", async ({
    page,
  }) => {
    await page.goto("/");

    const box = await getBox(page.getByRole("main"));
    const leftMargin = box.x;
    const rightMargin = 1440 - box.x - box.width;

    expect(box.width).toBeLessThanOrEqual(READING_WIDTH);
    expect(Math.abs(leftMargin - rightMargin)).toBeLessThanOrEqual(1);
  });
});

test.describe("Given a keyboard user on the home page", () => {
  test("When they press Tab, Then every link and button is reached in reading order with visible focus", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const focusable = page.locator("a[href], button");
    const count = await focusable.count();

    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index++) {
      const element = focusable.nth(index);

      await page.keyboard.press("Tab");
      await expect(element).toBeFocused();

      const hasVisibleFocus = await element.evaluate((node) => {
        const style = getComputedStyle(node);

        return style.boxShadow !== "none" || style.outlineStyle !== "none";
      });

      expect(hasVisibleFocus).toBe(true);
    }
  });
});
