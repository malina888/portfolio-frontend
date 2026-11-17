import ArticleView from "./ArticleView/ArticleView";
import { useArticle } from "./utils/useArticle";

interface Props {
  id: string;
}

const ArticlePage = ({ id }: Props) => {
  const { state, retry } = useArticle(id);

  return <ArticleView state={state} onRetry={retry} />;
};

export default ArticlePage;
