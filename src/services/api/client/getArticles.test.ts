import { AxiosError, type AxiosResponse } from "axios";
import { ZodError } from "zod";
import { apiClient } from "./apiClient";
import { getArticles } from "./getArticles";

const articles = [
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "Setting up a development environment",
    content: "Docker, Node.js and a database running on my machine.",
    publishedAt: "2026-10-01T08:00:00.000Z",
    createdAt: "2026-11-16T23:05:10.773Z",
    updatedAt: "2026-11-17T10:17:23.370Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world",
    content: "This is the first article on my blog.",
    publishedAt: "2026-09-01T08:00:00.000Z",
    createdAt: "2026-11-16T23:05:10.742Z",
    updatedAt: "2026-11-17T10:17:23.337Z",
  },
];

const answerWith = (data: unknown) => ({ data }) as AxiosResponse;

describe("getArticles", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("when the API answers with articles", () => {
    it("asks the articles endpoint", async () => {
      const get = vi
        .spyOn(apiClient, "get")
        .mockResolvedValue(answerWith(articles));

      await getArticles();

      expect(get).toHaveBeenCalledWith("/articles", { signal: undefined });
    });

    it("returns the articles in the order the API gave them", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(answerWith(articles));

      await expect(getArticles()).resolves.toEqual(articles);
    });
  });

  describe("when the API answers with no articles", () => {
    it("returns an empty list", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(answerWith([]));

      await expect(getArticles()).resolves.toEqual([]);
    });
  });

  describe("when the answer does not match the schema", () => {
    it("fails, instead of returning part of the answer", async () => {
      const answer = [
        articles[0],
        { ...articles[1], publishedAt: "yesterday" },
      ];
      vi.spyOn(apiClient, "get").mockResolvedValue(answerWith(answer));

      await expect(getArticles()).rejects.toBeInstanceOf(ZodError);
    });
  });

  describe("when the request fails", () => {
    it("fails with the same error", async () => {
      const error = new AxiosError("Network Error");
      vi.spyOn(apiClient, "get").mockRejectedValue(error);

      await expect(getArticles()).rejects.toBe(error);
    });
  });

  describe("when it gets an abort signal", () => {
    it("passes the signal on, so the request can be cancelled", async () => {
      const get = vi.spyOn(apiClient, "get").mockResolvedValue(answerWith([]));
      const controller = new AbortController();

      await getArticles(controller.signal);

      expect(get).toHaveBeenCalledWith("/articles", {
        signal: controller.signal,
      });
    });
  });
});
