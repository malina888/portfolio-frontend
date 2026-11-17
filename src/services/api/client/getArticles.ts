import {
  type Article,
  articleListSchema,
} from "@/services/api/schemas/article";
import { apiClient } from "./apiClient";

export const getArticles = async (signal?: AbortSignal): Promise<Article[]> => {
  const response = await apiClient.get<unknown>("/articles", { signal });

  return articleListSchema.parse(response.data);
};
