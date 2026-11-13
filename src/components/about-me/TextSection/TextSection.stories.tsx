import type { Meta, StoryObj } from "@storybook/react-vite";
import { ABOUT_ME } from "@/constants/about-me";
import TextSection from "./TextSection";

const meta = {
  title: "about-me/TextSection",
  component: TextSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "About me",
    text: ABOUT_ME,
  },
} satisfies Meta<typeof TextSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortText: Story = {
  args: {
    text: "Beginner web developer.",
  },
};

export const WithVeryLongWord: Story = {
  args: {
    text: "Averyveryverylongwordwithoutanyspacesthatmustwrapinsteadofoverflowingeveniftheviewportisreallywide.",
  },
};
