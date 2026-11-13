import type { Meta, StoryObj } from "@storybook/react-vite";
import { AUTHOR_NAME } from "@/constants/about-me";
import SiteFooter from "./SiteFooter";

const meta = {
  title: "about-me/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    name: AUTHOR_NAME,
    year: 2026,
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVeryLongName: Story = {
  args: {
    name: "Maciejaleksanderbartłomiejmalinowskiwiśniewskinowakowski",
  },
};
