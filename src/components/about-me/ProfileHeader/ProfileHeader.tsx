import { Button } from "@gi-org-pl/athena";
import type { ExternalLink, Portrait } from "@/types/about-me";

interface Props {
  name: string;
  tagline: string;
  portrait: Portrait;
  links: ExternalLink[];
}

const ProfileHeader = ({ name, tagline, portrait, links }: Props) => {
  return (
    <header className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
      <img
        src={portrait.src}
        alt={portrait.alt}
        width={160}
        height={160}
        className="size-32 shrink-0 rounded-full bg-gi-ash object-cover object-[50%_44%] sm:size-40"
      />
      <div className="flex w-full min-w-0 flex-col gap-4">
        <h1 className="text-4xl font-extrabold text-gi-dark-primary wrap-anywhere sm:text-5xl">
          {name}
        </h1>
        <p className="text-lg text-gi-dark-gray wrap-anywhere">{tagline}</p>
        {links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-3 sm:justify-start">
            {links.map((link) => (
              <li key={link.url}>
                <Button asChild>
                  <a href={link.url}>{link.label}</a>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;
