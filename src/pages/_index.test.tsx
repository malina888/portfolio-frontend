import { render, screen } from "@testing-library/react";
import { AxiosError } from "axios";
import { AUTHOR_NAME } from "@/constants/about-me";
import { getArticles } from "@/services/api/client/getArticles";
import type { Article } from "@/services/api/schemas/article";
import Index from "./_index";

vi.mock("@/services/api/client/getArticles");

const getArticlesMock = vi.mocked(getArticles);

const SECTION_HEADINGS = [
  "About me",
  "Achievements",
  "Projects",
  "Blog",
  "Currently learning",
  "Interests",
  "Contact",
];

const expectTheWholePage = () => {
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    AUTHOR_NAME,
  );
  expect(
    screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent),
  ).toEqual(SECTION_HEADINGS);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
};

describe("<Index /> home page", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("when a visitor opens it", () => {
    beforeEach(() => {
      getArticlesMock.mockReturnValue(new Promise<Article[]>(() => {}));
      render(<Index />);
    });

    it("shows the author's name as the only main heading", () => {
      const mainHeadings = screen.getAllByRole("heading", { level: 1 });

      expect(mainHeadings).toHaveLength(1);
      expect(mainHeadings[0]).toHaveTextContent(AUTHOR_NAME);
    });

    it("puts the content in the main landmark", () => {
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("shows every section, in reading order", () => {
      const sectionHeadings = screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent);

      expect(sectionHeadings).toEqual(SECTION_HEADINGS);
    });

    it("ends with a footer for the current year", () => {
      expect(screen.getByRole("contentinfo")).toHaveTextContent(
        `© ${new Date().getFullYear()} ${AUTHOR_NAME}`,
      );
    });
  });

  describe("while the articles are loading", () => {
    it("shows the rest of the page", () => {
      getArticlesMock.mockReturnValue(new Promise<Article[]>(() => {}));

      render(<Index />);

      expect(screen.getByRole("status")).toHaveTextContent("Loading articles…");
      expectTheWholePage();
    });
  });

  describe("when the articles cannot be loaded", () => {
    it("still shows the rest of the page", async () => {
      getArticlesMock.mockRejectedValue(
        new AxiosError("Network Error", "ERR_NETWORK"),
      );

      render(<Index />);

      expect(await screen.findByRole("alert")).toBeInTheDocument();
      expectTheWholePage();
    });
  });
});
