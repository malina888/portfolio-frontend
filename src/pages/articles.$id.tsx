import { useParams } from "react-router";
import ArticlePage from "@/components/blog/ArticlePage/ArticlePage";

const ArticleRoute = () => {
  // This route always has an id in the address, "" only satisfies TypeScript.
  const { id = "" } = useParams();

  // When only the id changes, React would keep ArticlePage and its state, so
  // the previous article would stay on the screen under the new address.
  // A new key makes React build ArticlePage from scratch, starting from loading.
  return <ArticlePage key={id} id={id} />;
};

export default ArticleRoute;
