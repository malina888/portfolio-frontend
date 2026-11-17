import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import type { ArticleState } from "../ArticlePage.types";
import ArticleView from "./ArticleView";

const article = {
  ...MOCK_ARTICLES[3],
  content: "The first paragraph.\n\nThe second paragraph.",
};

const renderArticleView = (state: ArticleState, onRetry = vi.fn()) =>
  render(<ArticleView state={state} onRetry={onRetry} />, {
    wrapper: MemoryRouter,
  });

describe("<ArticleView />", () => {
  describe.each<[string, ArticleState]>([
    ["loading", { status: "loading" }],
    ["shown", { status: "success", article }],
    ["not found", { status: "not-found" }],
    ["failed to load", { status: "error" }],
  ])("when the article is %s", (_, state) => {
    it("shows a way back to the about me page", () => {
      renderArticleView(state);

      expect(
        screen.getByRole("link", { name: "Back to the about me page" }),
      ).toHaveAttribute("href", "/");
    });

    it("puts the content in the main landmark", () => {
      renderArticleView(state);

      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });

  describe("when the article is loading", () => {
    beforeEach(() => {
      renderArticleView({ status: "loading" });
    });

    it("tells the visitor that it is loading", () => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Loading the article…",
      );
    });

    it("shows no article yet", () => {
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });
  });

  describe("when the API answers with the article", () => {
    beforeEach(() => {
      renderArticleView({ status: "success", article });
    });

    it("shows the title as the main heading", () => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Hello, world" }),
      ).toBeInTheDocument();
    });

    it("shows the publication date in a readable form", () => {
      expect(screen.getByText("1 September 2026")).toHaveAttribute(
        "datetime",
        "2026-09-01T08:00:00.000Z",
      );
    });

    it("shows the whole content, with its paragraphs kept", () => {
      const paragraphs = within(screen.getByRole("article"))
        .getAllByRole("paragraph")
        .map((paragraph) => paragraph.textContent);

      expect(paragraphs).toEqual([
        "The first paragraph.",
        "The second paragraph.",
      ]);
    });

    it("shows no loading or error message", () => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("when the content contains HTML", () => {
    const content =
      '<script>window.hacked = true;</script>\n<b>Bold?</b> <img src="x" onerror="window.hacked = true">';

    beforeEach(() => {
      renderArticleView({
        status: "success",
        article: { ...article, content },
      });
    });

    it("shows the HTML as plain text", () => {
      expect(
        screen.getByText("<script>window.hacked = true;</script>"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          '<b>Bold?</b> <img src="x" onerror="window.hacked = true">',
        ),
      ).toBeInTheDocument();
    });

    it("turns none of it into elements, so no script can run", () => {
      const articleElement = screen.getByRole("article");

      expect(articleElement.querySelector("script")).toBeNull();
      expect(articleElement.querySelector("b")).toBeNull();
      expect(articleElement.querySelector("img")).toBeNull();
    });
  });

  describe("when the article does not exist", () => {
    beforeEach(() => {
      renderArticleView({ status: "not-found" });
    });

    it("says that the article does not exist", () => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "This article does not exist.",
      );
    });

    it("does not offer to try again, because trying again will not help", () => {
      expect(
        screen.queryByRole("button", { name: "Try again" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("when the article could not be loaded", () => {
    const onRetry = vi.fn();

    beforeEach(() => {
      onRetry.mockClear();
      renderArticleView({ status: "error" }, onRetry);
    });

    it("shows an error message", () => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "The article could not be loaded.",
      );
    });

    it("shows no article", () => {
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });

    it("lets the visitor try again", () => {
      fireEvent.click(screen.getByRole("button", { name: "Try again" }));

      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });
});
