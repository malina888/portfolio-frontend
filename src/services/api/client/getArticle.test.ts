import { AxiosError, type AxiosResponse } from "axios";
import { ZodError } from "zod";
import { apiClient } from "./apiClient";
import { getArticle } from "./getArticle";

const article = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world",
  content: "This is the first article on my blog.",
  publishedAt: "2026-09-01T08:00:00.000Z",
  createdAt: "2026-11-16T23:05:10.742Z",
  updatedAt: "2026-11-17T10:17:23.337Z",
};

const answerWith = (data: unknown) => ({ data }) as AxiosResponse;

const failWithStatus = (status: number) =>
  new AxiosError(
    `Request failed with status code ${status}`,
    undefined,
    undefined,
    undefined,
    { status } as AxiosResponse,
  );

describe("getArticle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("when the API answers with the article", () => {
    it("asks for the article with the given id", async () => {
      const get = vi
        .spyOn(apiClient, "get")
        .mockResolvedValue(answerWith(article));

      await getArticle(article.id);

      expect(get).toHaveBeenCalledWith(`/articles/${article.id}`, {
        signal: undefined,
      });
    });

    it("returns the article", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(answerWith(article));

      await expect(getArticle(article.id)).resolves.toEqual(article);
    });
  });

  describe.each([
    ["the article does not exist", 404],
    ["the id is not a valid UUID", 400],
  ])("when %s", (_, status) => {
    it("returns null", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(failWithStatus(status));

      await expect(getArticle("made-up-id")).resolves.toBeNull();
    });
  });

  describe.each([
    ["the API answers with a server error", failWithStatus(500)],
    ["the API is down", new AxiosError("Network Error", "ERR_NETWORK")],
    [
      "the API never answers",
      new AxiosError("timeout of 10000ms exceeded", "ECONNABORTED"),
    ],
  ])("when %s", (_, error) => {
    it("fails with the same error", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(error);

      await expect(getArticle(article.id)).rejects.toBe(error);
    });
  });

  describe("when the answer does not match the schema", () => {
    it("fails, instead of returning part of the answer", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(
        answerWith({ ...article, publishedAt: "yesterday" }),
      );

      await expect(getArticle(article.id)).rejects.toBeInstanceOf(ZodError);
    });
  });

  describe("when the id has characters with a special meaning in an address", () => {
    it("encodes them, so the id stays one part of the path", async () => {
      const get = vi
        .spyOn(apiClient, "get")
        .mockResolvedValue(answerWith(article));

      await getArticle("a/b?c#d");

      expect(get).toHaveBeenCalledWith("/articles/a%2Fb%3Fc%23d", {
        signal: undefined,
      });
    });
  });

  describe("when it gets an abort signal", () => {
    it("passes the signal on, so the request can be cancelled", async () => {
      const get = vi
        .spyOn(apiClient, "get")
        .mockResolvedValue(answerWith(article));
      const controller = new AbortController();

      await getArticle(article.id, controller.signal);

      expect(get).toHaveBeenCalledWith(`/articles/${article.id}`, {
        signal: controller.signal,
      });
    });
  });
});
