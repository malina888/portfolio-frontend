import type { Meta, StoryObj } from "@storybook/react-vite";
import { PROJECTS } from "@/constants/about-me";
import ProjectCard from "./ProjectCard";

const meta = {
  title: "about-me/ProjectList/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    project: PROJECTS[0],
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyTechnologies: Story = {
  args: {
    project: PROJECTS[1],
  },
};

export const WithVeryLongText: Story = {
  args: {
    project: {
      name: "averyveryverylongprojectnamewithoutanyspacesthatmustwrapinsteadofoverflowing",
      description:
        "Averyveryverylongdescriptionwithoutanyspacesthatmustwrapinsteadofoverflowing.",
      url: "https://github.com/malina888",
      technologies: ["TypeScript"],
    },
  },
};
