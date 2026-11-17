import { render, screen } from "@testing-library/react";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticleCard from "./ArticleCard";

const article = MOCK_ARTICLES[3];

describe("<ArticleCard />", () => {
  describe("when it is rendered", () => {
    beforeEach(() => {
      render(<ArticleCard article={article} />);
    });

    it("shows the title as a subheading", () => {
      expect(
        screen.getByRole("heading", { level: 3, name: "Hello, world" }),
      ).toBeInTheDocument();
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
