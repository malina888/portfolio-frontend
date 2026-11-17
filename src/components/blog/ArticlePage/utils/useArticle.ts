import { useEffect, useState } from "react";
import { getArticle } from "@/services/api/client/getArticle";
import type { ArticleState } from "../ArticlePage.types";

export const useArticle = (id: string) => {
  const [state, setState] = useState<ArticleState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  // A new `id`, or `attempt` when the visitor tries again, runs this effect again.
  useEffect(() => {
    const controller = new AbortController();

    getArticle(id, controller.signal)
      .then((article) => {
        // After the cleanup, this answer belongs to an old id or attempt.
        if (controller.signal.aborted) {
          return;
        }

        setState(
          article ? { status: "success", article } : { status: "not-found" },
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      });

    return () => {
      controller.abort();
    };
  }, [id, attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  };

  return { state, retry };
};
