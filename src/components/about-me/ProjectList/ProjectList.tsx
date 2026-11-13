import { Section } from "@gi-org-pl/athena";
import type { Project } from "@/types/about-me";
import ProjectCard from "./ProjectCard/ProjectCard";

interface Props {
  title: string;
  projects: Project[];
}

const ProjectList = ({ title, projects }: Props) => {
  return (
    <Section title={title}>
      <ul className="flex flex-col gap-8">
        {projects.map((project) => (
          <li key={project.url}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default ProjectList;
