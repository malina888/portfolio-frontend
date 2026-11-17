import { act, renderHook, waitFor } from "@testing-library/react";
import { AxiosError, CanceledError } from "axios";
import { ZodError } from "zod";
import { getArticle } from "@/services/api/client/getArticle";
import type { Article } from "@/services/api/schemas/article";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import { useArticle } from "./useArticle";

vi.mock("@/services/api/client/getArticle");

const getArticleMock = vi.mocked(getArticle);

const [FIRST_ARTICLE, SECOND_ARTICLE] = MOCK_ARTICLES;

const neverAnswers = () => new Promise<Article | null>(() => {});

const renderUseArticle = (id: string) =>
  renderHook((props: { id: string }) => useArticle(props.id), {
    initialProps: { id },
  });

describe("useArticle", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  describe("when the article is loading", () => {
    it("reports that it is loading", () => {
      getArticleMock.mockReturnValue(neverAnswers());

      const { result } = renderUseArticle(FIRST_ARTICLE.id);

      expect(result.current.state).toEqual({ status: "loading" });
    });

    it("asks for the article with the given id", () => {
      getArticleMock.mockReturnValue(neverAnswers());

      renderUseArticle(FIRST_ARTICLE.id);

      expect(getArticleMock).toHaveBeenCalledWith(
        FIRST_ARTICLE.id,
        expect.any(AbortSignal),
      );
    });
  });

  describe("when the API answers with the article", () => {
    it("returns the article", async () => {
      getArticleMock.mockResolvedValue(FIRST_ARTICLE);

      const { result } = renderUseArticle(FIRST_ARTICLE.id);

      await waitFor(() => {
        expect(result.current.state).toEqual({
          status: "success",
          article: FIRST_ARTICLE,
        });
      });
    });
  });

  describe("when the article does not exist", () => {
    it("reports that it was not found", async () => {
      getArticleMock.mockResolvedValue(null);

      const { result } = renderUseArticle("made-up-id");

      await waitFor(() => {
        expect(result.current.state).toEqual({ status: "not-found" });
      });
    });
  });

  describe.each([
    ["the API is down", new AxiosError("Network Error", "ERR_NETWORK")],
    [
      "the API answers with an error",
      new AxiosError("Request failed with status code 500", "ERR_BAD_RESPONSE"),
    ],
    [
      "the API never answers",
      new AxiosError("timeout of 10000ms exceeded", "ECONNABORTED"),
    ],
    ["the answer does not match the schema", new ZodError([])],
  ])("when %s", (_, error) => {
    it("reports an error", async () => {
      getArticleMock.mockRejectedValue(error);

      const { result } = renderUseArticle(FIRST_ARTICLE.id);

      await waitFor(() => {
        expect(result.current.state).toEqual({ status: "error" });
      });
    });
  });

  describe("when the visitor tries again", () => {
    it("loads the article again", async () => {
      getArticleMock
        .mockRejectedValueOnce(new AxiosError("Network Error", "ERR_NETWORK"))
        .mockResolvedValueOnce(FIRST_ARTICLE);
      const { result } = renderUseArticle(FIRST_ARTICLE.id);
      await waitFor(() => {
        expect(result.current.state).toEqual({ status: "error" });
      });

      act(() => {
        result.current.retry();
      });

      expect(result.current.state).toEqual({ status: "loading" });
      await waitFor(() => {
        expect(result.current.state).toEqual({
          status: "success",
          article: FIRST_ARTICLE,
        });
      });
      expect(getArticleMock).toHaveBeenCalledTimes(2);
    });
  });

  describe("when the id changes", () => {
    it("cancels the old request and asks for the new article", () => {
      getArticleMock.mockReturnValue(neverAnswers());
      const { rerender } = renderUseArticle(FIRST_ARTICLE.id);

      rerender({ id: SECOND_ARTICLE.id });

      const [oldCall, newCall] = getArticleMock.mock.calls;
      expect(oldCall[0]).toBe(FIRST_ARTICLE.id);
      expect(oldCall[1]?.aborted).toBe(true);
      expect(newCall[0]).toBe(SECOND_ARTICLE.id);
      expect(newCall[1]?.aborted).toBe(false);
    });

    it("ignores an answer for the old id that comes too late", async () => {
      let answerOldRequest: (article: Article) => void = () => {};
      getArticleMock
        .mockReturnValueOnce(
          new Promise<Article | null>((resolve) => {
            answerOldRequest = resolve;
          }),
        )
        .mockReturnValueOnce(neverAnswers());
      const { result, rerender } = renderUseArticle(FIRST_ARTICLE.id);
      rerender({ id: SECOND_ARTICLE.id });

      await act(async () => {
        answerOldRequest(FIRST_ARTICLE);
      });

      expect(result.current.state).toEqual({ status: "loading" });
    });
  });

  describe("when the visitor leaves the page before the answer arrives", () => {
    it("cancels the request", () => {
      getArticleMock.mockReturnValue(neverAnswers());
      const { unmount } = renderUseArticle(FIRST_ARTICLE.id);

      unmount();

      const signal = getArticleMock.mock.calls[0][1];
      expect(signal?.aborted).toBe(true);
    });

    it("writes nothing to the console when the request is cancelled", async () => {
      let cancelRequest = () => {};
      getArticleMock.mockReturnValue(
        new Promise<Article | null>((_, reject) => {
          cancelRequest = () => reject(new CanceledError());
        }),
      );
      const consoleError = vi.spyOn(console, "error");
      const consoleWarn = vi.spyOn(console, "warn");
      const { unmount } = renderUseArticle(FIRST_ARTICLE.id);

      unmount();
      await act(async () => {
        cancelRequest();
      });

      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });
});
