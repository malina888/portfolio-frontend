import { Link } from "react-router";
import type { Article } from "@/services/api/schemas/article";
import { formatDate } from "@/utils/date/formatDate";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <article className="flex flex-col gap-2">
      <h3 className="font-bold text-gi-dark-primary wrap-anywhere">
        <Link
          to={`/articles/${article.id}`}
          className="underline-offset-4 hover:underline focus-visible:underline"
        >
          {article.title}
        </Link>
      </h3>
      <time
        dateTime={article.publishedAt}
        className="text-sm text-gi-dark-gray"
      >
        {formatDate(article.publishedAt)}
      </time>
      <p className="line-clamp-3 wrap-anywhere">{article.content}</p>
    </article>
  );
};

export default ArticleCard;
