import { render, screen, within } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

const project = {
  name: "todo-app",
  description: "A simple to-do list.",
  url: "https://github.com/jan-kowalski/todo-app",
  technologies: ["React", "TypeScript"],
};

describe("<ProjectCard />", () => {
  describe("when it is rendered", () => {
    beforeEach(() => {
      render(<ProjectCard project={project} />);
    });

    it("shows the project name as a subheading", () => {
      expect(
        screen.getByRole("heading", { level: 3, name: "todo-app" }),
      ).toBeInTheDocument();
    });

    it("shows the description", () => {
      expect(screen.getByText("A simple to-do list.")).toBeInTheDocument();
    });

    it("shows every technology in a labelled list", () => {
      const list = screen.getByRole("list", {
        name: "Technologies used in todo-app",
      });
      const technologies = within(list)
        .getAllByRole("listitem")
        .map((item) => item.textContent);

      expect(technologies).toEqual(["React", "TypeScript"]);
    });

    it("links to the repository with a name that says which project it is", () => {
      expect(
        screen.getByRole("link", { name: "View on GitHub (todo-app)" }),
      ).toHaveAttribute("href", "https://github.com/jan-kowalski/todo-app");
    });
  });
});
