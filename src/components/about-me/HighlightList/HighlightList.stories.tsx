import type { Meta, StoryObj } from "@storybook/react-vite";
import { HIGHLIGHTS } from "@/constants/about-me";
import HighlightList from "./HighlightList";

const meta = {
  title: "about-me/HighlightList",
  component: HighlightList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    highlights: HIGHLIGHTS,
  },
} satisfies Meta<typeof HighlightList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleHighlight: Story = {
  args: {
    highlights: [{ value: "Since 2021", label: "training lifesaving sport" }],
  },
};

export const WithVeryLongText: Story = {
  args: {
    highlights: [
      {
        value: "Supercalifragilisticexpialidocious",
        label:
          "Averyveryverylonglabelwithoutanyspacesthatmustwrapinsteadofoverflowing",
      },
      { value: "8", label: "podium places in 2026" },
      { value: "1st", label: "overall (junior)" },
    ],
  },
};

export const Empty: Story = {
  args: {
    highlights: [],
  },
};
