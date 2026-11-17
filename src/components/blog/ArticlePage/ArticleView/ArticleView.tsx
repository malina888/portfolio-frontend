import { Button, InfoMessage } from "@gi-org-pl/athena";
import { Link } from "react-router";
import { formatDate } from "@/utils/date/formatDate";
import type { ArticleState } from "../ArticlePage.types";
import { splitIntoParagraphs } from "./utils/splitIntoParagraphs";

interface Props {
  state: ArticleState;
  onRetry: () => void;
}

const ArticleView = ({ state, onRetry }: Props) => {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-start gap-8 px-4 py-8 sm:py-14">
      <Button asChild type="ghost">
        <Link to="/">
          <span aria-hidden="true">←</span> Back to the about me page
        </Link>
      </Button>

      {state.status === "loading" && (
        <p role="status" className="text-gi-dark-gray">
          Loading the article…
        </p>
      )}

      {state.status === "not-found" && (
        <InfoMessage variant="info" role="alert">
          This article does not exist. It may have been removed, or the address
          may be wrong.
        </InfoMessage>
      )}

      {state.status === "error" && (
        <div className="flex flex-col items-start gap-4">
          <InfoMessage variant="error" role="alert">
            The article could not be loaded.
          </InfoMessage>
          <Button onClick={onRetry}>Try again</Button>
        </div>
      )}

      {state.status === "success" && (
        <article className="flex w-full flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gi-dark-primary wrap-anywhere sm:text-4xl">
            {state.article.title}
          </h1>
          <time
            dateTime={state.article.publishedAt}
            className="text-gi-dark-gray"
          >
            {formatDate(state.article.publishedAt)}
          </time>
          {splitIntoParagraphs(state.article.content).map(
            (paragraph, index) => (
              // The paragraphs never change their order, so the index is a safe key.
              <p key={index} className="wrap-anywhere">
                {paragraph}
              </p>
            ),
          )}
        </article>
      )}
    </main>
  );
};

export default ArticleView;
