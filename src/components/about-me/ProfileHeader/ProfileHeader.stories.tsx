import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AUTHOR_NAME,
  AUTHOR_PORTRAIT,
  AUTHOR_TAGLINE,
  GITHUB_URL,
} from "@/constants/about-me";
import ProfileHeader from "./ProfileHeader";

const meta = {
  title: "about-me/ProfileHeader",
  component: ProfileHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    name: AUTHOR_NAME,
    tagline: AUTHOR_TAGLINE,
    portrait: AUTHOR_PORTRAIT,
    links: [{ label: "GitHub", url: GITHUB_URL }],
  },
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithManyLinks: Story = {
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

export const WithoutLinks: Story = {
  args: {
    links: [],
  },
};

export const WithVeryLongName: Story = {
  args: {
    name: "Maciejaleksanderbartłomiejmalinowskiwiśniewskinowakowski",
    tagline:
      "Averyveryverylongtaglinewithoutanyspacesthatmustwrapinsteadofoverflowingeveniftheviewportisreallywideandthereisplentyofroom.",
  },
};
