import { Badge, Section } from "@gi-org-pl/athena";

interface Props {
  title: string;
  tags: string[];
  variant?: "primary" | "secondary";
}

const TagList = ({ title, tags, variant = "secondary" }: Props) => {
  return (
    <Section title={title}>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge variant={variant}>{tag}</Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default TagList;
