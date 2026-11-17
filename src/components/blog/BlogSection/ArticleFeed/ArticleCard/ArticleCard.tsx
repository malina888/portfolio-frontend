import type { Article } from "@/services/api/schemas/article";
import { formatDate } from "@/utils/date/formatDate";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <article className="flex flex-col gap-2">
      <h3 className="font-bold text-gi-dark-primary wrap-anywhere">
        {article.title}
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
