import { Button, InfoMessage } from "@gi-org-pl/athena";
import type { ArticlesState } from "../BlogSection.types";
import ArticleCard from "./ArticleCard/ArticleCard";

interface Props {
  state: ArticlesState;
  onRetry: () => void;
}

const ArticleFeed = ({ state, onRetry }: Props) => {
  if (state.status === "loading") {
    return (
      <p role="status" className="text-gi-dark-gray">
        Loading articles…
      </p>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-start gap-4">
        <InfoMessage variant="error" role="alert">
          The articles could not be loaded.
        </InfoMessage>
        <Button onClick={onRetry}>Try again</Button>
      </div>
    );
  }

  if (state.articles.length === 0) {
    return <InfoMessage variant="info">There are no articles yet.</InfoMessage>;
  }

  return (
    <ul className="flex flex-col gap-8">
      {state.articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
};

export default ArticleFeed;
