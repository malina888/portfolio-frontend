import { Section } from "@gi-org-pl/athena";

interface Props {
  title: string;
  text: string;
}

const TextSection = ({ title, text }: Props) => {
  return (
    <Section title={title}>
      <p className="leading-relaxed wrap-anywhere">{text}</p>
    </Section>
  );
};

export default TextSection;
