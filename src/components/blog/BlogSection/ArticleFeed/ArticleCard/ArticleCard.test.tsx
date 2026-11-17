import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticleCard from "./ArticleCard";

const article = MOCK_ARTICLES[3];

describe("<ArticleCard />", () => {
  describe("when it is rendered", () => {
    beforeEach(() => {
      render(<ArticleCard article={article} />, { wrapper: MemoryRouter });
    });

    it("shows the title as a subheading", () => {
      expect(
        screen.getByRole("heading", { level: 3, name: "Hello, world" }),
      ).toBeInTheDocument();
    });

    it("links the title to the article's page", () => {
      expect(
        screen.getByRole("link", { name: "Hello, world" }),
      ).toHaveAttribute(
        "href",
        "/articles/5e1f0a2b-0001-4000-8000-000000000001",
      );
    });

    it("shows the publication date in a readable form", () => {
      expect(screen.getByText("1 September 2026")).toHaveAttribute(
        "datetime",
        "2026-09-01T08:00:00.000Z",
      );
    });

    it("shows the content", () => {
      expect(
        screen.getByText("This is the first article on my blog."),
      ).toBeInTheDocument();
    });
  });
});
