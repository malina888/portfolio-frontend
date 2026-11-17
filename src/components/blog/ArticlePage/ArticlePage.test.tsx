import { fireEvent, render, screen } from "@testing-library/react";
import { AxiosError } from "axios";
import { MemoryRouter } from "react-router";
import { getArticle } from "@/services/api/client/getArticle";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticlePage from "./ArticlePage";

vi.mock("@/services/api/client/getArticle");

const getArticleMock = vi.mocked(getArticle);

const article = MOCK_ARTICLES[3];

const renderArticlePage = (id: string) =>
  render(<ArticlePage id={id} />, { wrapper: MemoryRouter });

describe("<ArticlePage />", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("when the API answers with the article", () => {
    it("shows that the article is loading, then the article", async () => {
      getArticleMock.mockResolvedValue(article);

      renderArticlePage(article.id);

      expect(screen.getByRole("status")).toHaveTextContent(
        "Loading the article…",
      );
      expect(
        await screen.findByRole("heading", { level: 1, name: article.title }),
      ).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(getArticleMock).toHaveBeenCalledWith(
        article.id,
        expect.any(AbortSignal),
      );
    });
  });

  describe("when the article does not exist", () => {
    it("says so", async () => {
      getArticleMock.mockResolvedValue(null);

      renderArticlePage("made-up-id");

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "This article does not exist.",
      );
    });
  });

  describe("when loading fails and the visitor tries again", () => {
    it("loads the article again", async () => {
      getArticleMock
        .mockRejectedValueOnce(new AxiosError("Network Error", "ERR_NETWORK"))
        .mockResolvedValueOnce(article);
      renderArticlePage(article.id);

      fireEvent.click(await screen.findByRole("button", { name: "Try again" }));

      expect(
        await screen.findByRole("heading", { level: 1, name: article.title }),
      ).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(getArticleMock).toHaveBeenCalledTimes(2);
    });
  });
});
