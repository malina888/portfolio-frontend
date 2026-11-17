import { act, renderHook, waitFor } from "@testing-library/react";
import { AxiosError, CanceledError } from "axios";
import { ZodError } from "zod";
import { getArticles } from "@/services/api/client/getArticles";
import type { Article } from "@/services/api/schemas/article";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import { useArticles } from "./useArticles";

vi.mock("@/services/api/client/getArticles");

const getArticlesMock = vi.mocked(getArticles);

const neverAnswers = () => new Promise<Article[]>(() => {});

describe("useArticles", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  describe("when the articles are loading", () => {
    it("reports that they are loading", () => {
      getArticlesMock.mockReturnValue(neverAnswers());

      const { result } = renderHook(() => useArticles());

      expect(result.current.state).toEqual({ status: "loading" });
    });
  });

  describe("when the API answers with articles", () => {
    it("returns the articles", async () => {
      getArticlesMock.mockResolvedValue(MOCK_ARTICLES);

      const { result } = renderHook(() => useArticles());

      await waitFor(() => {
        expect(result.current.state).toEqual({
          status: "success",
          articles: MOCK_ARTICLES,
        });
      });
    });
  });

  describe("when the API answers with no articles", () => {
    it("returns an empty list", async () => {
      getArticlesMock.mockResolvedValue([]);

      const { result } = renderHook(() => useArticles());

      await waitFor(() => {
        expect(result.current.state).toEqual({
          status: "success",
          articles: [],
        });
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
      getArticlesMock.mockRejectedValue(error);

      const { result } = renderHook(() => useArticles());

      await waitFor(() => {
        expect(result.current.state).toEqual({ status: "error" });
      });
    });
  });

  describe("when the visitor tries again", () => {
    it("loads the articles again", async () => {
      getArticlesMock
        .mockRejectedValueOnce(new AxiosError("Network Error", "ERR_NETWORK"))
        .mockResolvedValueOnce(MOCK_ARTICLES);
      const { result } = renderHook(() => useArticles());
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
          articles: MOCK_ARTICLES,
        });
      });
      expect(getArticlesMock).toHaveBeenCalledTimes(2);
    });
  });

  describe("when the visitor leaves the page before the answer arrives", () => {
    it("cancels the request", () => {
      getArticlesMock.mockReturnValue(neverAnswers());
      const { unmount } = renderHook(() => useArticles());

      unmount();

      const signal = getArticlesMock.mock.calls[0][0];
      expect(signal?.aborted).toBe(true);
    });

    it("writes nothing to the console when the request is cancelled", async () => {
      let cancelRequest = () => {};
      getArticlesMock.mockReturnValue(
        new Promise<Article[]>((_, reject) => {
          cancelRequest = () => reject(new CanceledError());
        }),
      );
      const consoleError = vi.spyOn(console, "error");
      const consoleWarn = vi.spyOn(console, "warn");
      const { unmount } = renderHook(() => useArticles());

      unmount();
      await act(async () => {
        cancelRequest();
      });

      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });
});
