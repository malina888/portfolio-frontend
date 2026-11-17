import type { Article } from "@/services/api/schemas/article";

interface Props {
  article: Article;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

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
        {dateFormat.format(new Date(article.publishedAt))}
      </time>
      <p className="line-clamp-3 wrap-anywhere">{article.content}</p>
    </article>
  );
};

export default ArticleCard;
