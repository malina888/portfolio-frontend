import { fireEvent, render, screen } from "@testing-library/react";
import { AxiosError } from "axios";
import { createRoutesStub } from "react-router";
import { AUTHOR_NAME } from "@/constants/about-me";
import { getArticle } from "@/services/api/client/getArticle";
import { getArticles } from "@/services/api/client/getArticles";
import type { Article } from "@/services/api/schemas/article";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import Index from "./_index";
import ArticleRoute from "./articles.$id";

vi.mock("@/services/api/client/getArticles");
vi.mock("@/services/api/client/getArticle");

const getArticlesMock = vi.mocked(getArticles);
const getArticleMock = vi.mocked(getArticle);

// The home page and the article page, so a test can go from one to the other.
const Stub = createRoutesStub([
  { path: "/", Component: Index },
  { path: "/articles/:id", Component: ArticleRoute },
]);

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

  describe("when a visitor picks an article in the blog section", () => {
    const article = MOCK_ARTICLES[3];

    beforeEach(() => {
      getArticlesMock.mockResolvedValue(MOCK_ARTICLES);
      getArticleMock.mockResolvedValue(article);
    });

    it("opens the article's page", async () => {
      render(<Stub initialEntries={["/"]} />);

      fireEvent.click(await screen.findByRole("link", { name: article.title }));

      expect(
        await screen.findByRole("heading", { level: 1, name: article.title }),
      ).toBeInTheDocument();
      expect(getArticleMock).toHaveBeenCalledWith(
        article.id,
        expect.any(AbortSignal),
      );
    });

    it("lets the visitor go back to the about me page", async () => {
      render(<Stub initialEntries={["/"]} />);
      fireEvent.click(await screen.findByRole("link", { name: article.title }));

      fireEvent.click(
        await screen.findByRole("link", { name: "Back to the about me page" }),
      );

      expect(
        await screen.findByRole("heading", { level: 1, name: AUTHOR_NAME }),
      ).toBeInTheDocument();
    });
  });
});
