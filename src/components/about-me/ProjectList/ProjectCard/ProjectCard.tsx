import { Badge, Button } from "@gi-org-pl/athena";
import type { Project } from "@/types/about-me";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <article className="flex flex-col gap-3">
      <h3 className="font-bold text-gi-dark-primary wrap-anywhere">
        {project.name}
      </h3>
      <p className="wrap-anywhere">{project.description}</p>
      <ul
        aria-label={`Technologies used in ${project.name}`}
        className="flex flex-wrap gap-2"
      >
        {project.technologies.map((technology) => (
          <li key={technology}>
            <Badge variant="secondary">{technology}</Badge>
          </li>
        ))}
      </ul>
      <div>
        <Button asChild type="outlined">
          <a href={project.url}>
            View on GitHub <span className="sr-only">({project.name})</span>
          </a>
        </Button>
      </div>
    </article>
  );
};

export default ProjectCard;
