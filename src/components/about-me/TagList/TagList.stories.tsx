import type { Meta, StoryObj } from "@storybook/react-vite";
import { CURRENTLY_LEARNING, INTERESTS } from "@/constants/about-me";
import TagList from "./TagList";

const meta = {
  title: "about-me/TagList",
  component: TagList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
  },
  args: {
    title: "Interests",
    tags: INTERESTS,
  },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {};

export const Primary: Story = {
  args: {
    title: "Currently learning",
    tags: CURRENTLY_LEARNING,
    variant: "primary",
  },
};

export const SingleTag: Story = {
  args: {
    tags: ["Sport"],
  },
};

export const ManyTags: Story = {
  args: {
    tags: [...CURRENTLY_LEARNING, ...INTERESTS],
  },
};
