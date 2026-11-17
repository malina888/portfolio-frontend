import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRoutesStub, Link, Outlet } from "react-router";
import { getArticle } from "@/services/api/client/getArticle";
import type { Article } from "@/services/api/schemas/article";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticleRoute from "./articles.$id";

vi.mock("@/services/api/client/getArticle");

const getArticleMock = vi.mocked(getArticle);

const [FIRST_ARTICLE, SECOND_ARTICLE] = MOCK_ARTICLES;

// The app has no link from one article to another yet, so the test adds one
// above the article page.
const WithLinkToSecondArticle = () => (
  <>
    <Link to={`/articles/${SECOND_ARTICLE.id}`}>Open another article</Link>
    <Outlet />
  </>
);

const Stub = createRoutesStub([
  { path: "/", Component: () => <h1>About me page</h1> },
  {
    Component: WithLinkToSecondArticle,
    children: [{ path: "/articles/:id", Component: ArticleRoute }],
  },
]);

const openAddress = (address: string) =>
  render(<Stub initialEntries={[address]} />);

describe("/articles/:id page", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("when a visitor opens an article address directly", () => {
    it("loads the article with the id from the address", async () => {
      getArticleMock.mockResolvedValue(FIRST_ARTICLE);

      openAddress(`/articles/${FIRST_ARTICLE.id}`);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: FIRST_ARTICLE.title,
        }),
      ).toBeInTheDocument();
      expect(getArticleMock).toHaveBeenCalledWith(
        FIRST_ARTICLE.id,
        expect.any(AbortSignal),
      );
    });
  });

  describe("when the address has an id of no article", () => {
    it("says that the article does not exist and shows a way back", async () => {
      getArticleMock.mockResolvedValue(null);

      openAddress("/articles/made-up-id");

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "This article does not exist.",
      );
      expect(
        screen.getByRole("link", { name: "Back to the about me page" }),
      ).toBeInTheDocument();
      expect(getArticleMock).toHaveBeenCalledWith(
        "made-up-id",
        expect.any(AbortSignal),
      );
    });
  });

  describe("when the visitor goes from one article to another", () => {
    it("loads the new article and never shows the old one under the new address", async () => {
      let answerWithSecondArticle: (article: Article) => void = () => {};
      getArticleMock.mockImplementation((id) =>
        id === FIRST_ARTICLE.id
          ? Promise.resolve(FIRST_ARTICLE)
          : new Promise<Article | null>((resolve) => {
              answerWithSecondArticle = resolve;
            }),
      );
      openAddress(`/articles/${FIRST_ARTICLE.id}`);
      await screen.findByRole("heading", {
        level: 1,
        name: FIRST_ARTICLE.title,
      });

      fireEvent.click(
        screen.getByRole("link", { name: "Open another article" }),
      );

      expect(await screen.findByRole("status")).toHaveTextContent(
        "Loading the article…",
      );
      expect(
        screen.queryByRole("heading", { level: 1, name: FIRST_ARTICLE.title }),
      ).not.toBeInTheDocument();

      await act(async () => {
        answerWithSecondArticle(SECOND_ARTICLE);
      });

      expect(
        screen.getByRole("heading", { level: 1, name: SECOND_ARTICLE.title }),
      ).toBeInTheDocument();
    });
  });

  describe("when the visitor follows the link back", () => {
    it("shows the about me page", async () => {
      getArticleMock.mockResolvedValue(FIRST_ARTICLE);
      openAddress(`/articles/${FIRST_ARTICLE.id}`);

      fireEvent.click(
        await screen.findByRole("link", { name: "Back to the about me page" }),
      );

      expect(
        await screen.findByRole("heading", { level: 1, name: "About me page" }),
      ).toBeInTheDocument();
    });
  });
});
