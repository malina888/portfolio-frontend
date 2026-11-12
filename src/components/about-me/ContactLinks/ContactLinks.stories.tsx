import type { Meta, StoryObj } from "@storybook/react-vite";
import { CONTACT_LINKS, GITHUB_URL } from "@/constants/about-me";
import ContactLinks from "./ContactLinks";

const meta = {
  title: "about-me/ContactLinks",
  component: ContactLinks,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Contact",
    text: "Want to see what I'm building? Find me here:",
    links: CONTACT_LINKS,
  },
} satisfies Meta<typeof ContactLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyLinks: Story = {
  args: {
    links: [
      { label: "GitHub", url: GITHUB_URL },
      {
        label: "blog-backend",
        url: "https://github.com/malina888/blog-backend",
      },
      {
        label: "portfolio-frontend",
        url: "https://github.com/malina888/portfolio-frontend",
      },
    ],
  },
};
