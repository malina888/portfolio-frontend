import type { Article } from "@/services/api/schemas/article";

export type ArticleState =
  | { status: "loading" }
  | { status: "success"; article: Article }
  | { status: "not-found" }
  | { status: "error" };
