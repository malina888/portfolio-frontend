import { HttpStatusCode, isAxiosError } from "axios";
import { type Article, articleSchema } from "@/services/api/schemas/article";
import { apiClient } from "./apiClient";

// The API answers 404 when no article has this id, and 400 when the id is not
// a valid UUID. For a visitor both mean the same: the article does not exist.
const isMissingArticle = (error: unknown) =>
  isAxiosError(error) &&
  (error.response?.status === HttpStatusCode.NotFound ||
    error.response?.status === HttpStatusCode.BadRequest);

// Returns null when the article does not exist. Any other problem is an error.
export const getArticle = async (
  id: string,
  signal?: AbortSignal,
): Promise<Article | null> => {
  try {
    // The id comes from the address, so the visitor can type anything there.
    // encodeURIComponent keeps it inside one part of the API path.
    const response = await apiClient.get<unknown>(
      `/articles/${encodeURIComponent(id)}`,
      { signal },
    );

    return articleSchema.parse(response.data);
  } catch (error) {
    if (isMissingArticle(error)) {
      return null;
    }

    throw error;
  }
};
