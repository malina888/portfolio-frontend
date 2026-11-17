import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticleFeed from "./ArticleFeed";

describe("<ArticleFeed />", () => {
  describe("when the articles are loading", () => {
    it("tells the visitor that they are loading", () => {
      render(<ArticleFeed state={{ status: "loading" }} onRetry={vi.fn()} />, {
        wrapper: MemoryRouter,
      });

      expect(screen.getByRole("status")).toHaveTextContent("Loading articles…");
    });
  });

  describe("when there are articles", () => {
    beforeEach(() => {
      render(
        <ArticleFeed
          state={{ status: "success", articles: MOCK_ARTICLES }}
          onRetry={vi.fn()}
        />,
        { wrapper: MemoryRouter },
      );
    });

    it("shows every article, in the order it got them", () => {
      const titles = screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

      expect(titles).toEqual(MOCK_ARTICLES.map(({ title }) => title));
    });

    it("shows the date of every article", () => {
      expect(screen.getAllByText("1 November 2026")).toHaveLength(2);
      expect(screen.getByText("1 October 2026")).toBeInTheDocument();
      expect(screen.getByText("1 September 2026")).toBeInTheDocument();
    });
  });

  describe("when there are no articles", () => {
    beforeEach(() => {
      render(
        <ArticleFeed
          state={{ status: "success", articles: [] }}
          onRetry={vi.fn()}
        />,
        { wrapper: MemoryRouter },
      );
    });

    it("says that there are no articles yet", () => {
      expect(
        screen.getByText("There are no articles yet."),
      ).toBeInTheDocument();
    });

    it("shows no list", () => {
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("when the articles could not be loaded", () => {
    const onRetry = vi.fn();

    beforeEach(() => {
      onRetry.mockClear();
      render(<ArticleFeed state={{ status: "error" }} onRetry={onRetry} />, {
        wrapper: MemoryRouter,
      });
    });

    it("shows an error message", () => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "The articles could not be loaded.",
      );
    });

    it("shows no articles", () => {
      expect(
        screen.queryByRole("heading", { level: 3 }),
      ).not.toBeInTheDocument();
    });

    it("lets the visitor try again", () => {
      fireEvent.click(screen.getByRole("button", { name: "Try again" }));

      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });
});
