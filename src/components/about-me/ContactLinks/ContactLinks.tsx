import { Button, Section } from "@gi-org-pl/athena";
import type { ExternalLink } from "@/types/about-me";

interface Props {
  title: string;
  text: string;
  links: ExternalLink[];
}

const ContactLinks = ({ title, text, links }: Props) => {
  return (
    <Section title={title}>
      <div className="flex flex-col gap-4">
        <p className="wrap-anywhere">{text}</p>
        <ul className="flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.url}>
              <Button asChild type="outlined">
                <a href={link.url}>{link.label}</a>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default ContactLinks;
