import { useEffect, useState } from "react";
import { getArticles } from "@/services/api/client/getArticles";
import type { ArticlesState } from "../BlogSection.types";

export const useArticles = () => {
  const [state, setState] = useState<ArticlesState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  // `attempt` changes when the visitor tries again, which runs this effect again.
  useEffect(() => {
    const controller = new AbortController();

    getArticles(controller.signal)
      .then((articles) => {
        setState({ status: "success", articles });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      });

    return () => {
      controller.abort();
    };
  }, [attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  };

  return { state, retry };
};
