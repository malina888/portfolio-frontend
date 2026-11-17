import { Section } from "@gi-org-pl/athena";
import ArticleFeed from "./ArticleFeed/ArticleFeed";
import { useArticles } from "./utils/useArticles";

interface Props {
  title: string;
}

const BlogSection = ({ title }: Props) => {
  const { state, retry } = useArticles();

  return (
    <Section title={title}>
      <ArticleFeed state={state} onRetry={retry} />
    </Section>
  );
};

export default BlogSection;
