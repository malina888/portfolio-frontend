import type { Article } from "@/services/api/schemas/article";

export type ArticlesState =
  | { status: "loading" }
  | { status: "success"; articles: Article[] }
  | { status: "error" };
