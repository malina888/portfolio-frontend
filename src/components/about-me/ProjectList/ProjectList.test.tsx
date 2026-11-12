import { render, screen } from "@testing-library/react";
import ProjectList from "./ProjectList";

const projects = [
  {
    name: "todo-app",
    description: "A simple to-do list.",
    url: "https://github.com/jan-kowalski/todo-app",
    technologies: ["React"],
  },
  {
    name: "weather-api",
    description: "A small weather API.",
    url: "https://github.com/jan-kowalski/weather-api",
    technologies: ["NestJS"],
  },
];

describe("<ProjectList />", () => {
  describe("when it is rendered with projects", () => {
    beforeEach(() => {
      render(<ProjectList title="Projects" projects={projects} />);
    });

    it("shows the title as a section heading", () => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Projects" }),
      ).toBeInTheDocument();
    });

    it("shows every project, in order", () => {
      const names = screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

      expect(names).toEqual(["todo-app", "weather-api"]);
    });
  });
});
