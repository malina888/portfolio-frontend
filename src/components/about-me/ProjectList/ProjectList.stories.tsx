import type { Meta, StoryObj } from "@storybook/react-vite";
import { PROJECTS } from "@/constants/about-me";
import ProjectList from "./ProjectList";

const meta = {
  title: "about-me/ProjectList",
  component: ProjectList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Projects",
    projects: PROJECTS,
  },
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleProject: Story = {
  args: {
    projects: [PROJECTS[0]],
  },
};
