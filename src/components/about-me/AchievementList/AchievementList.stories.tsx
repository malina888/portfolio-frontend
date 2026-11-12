import type { Meta, StoryObj } from "@storybook/react-vite";
import { ACHIEVEMENTS } from "@/constants/about-me";
import AchievementList from "./AchievementList";

const meta = {
  title: "about-me/AchievementList",
  component: AchievementList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Achievements",
    achievements: ACHIEVEMENTS,
  },
} satisfies Meta<typeof AchievementList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleAchievement: Story = {
  args: {
    achievements: [
      {
        event: "Polish Lifesaving Grand Prix 2026",
        location: "Kędzierzyn-Koźle",
        date: "10 October 2026",
        results: [
          { place: "2nd", description: "Open 4 × 50 m Obstacle Relay (team)" },
        ],
      },
    ],
  },
};

export const WithVeryLongText: Story = {
  args: {
    achievements: [
      {
        event:
          "Averyveryverylongeventnamewithoutanyspacesthatmustwrapinsteadofoverflowing",
        location: "Kędzierzyn-Koźle",
        date: "10 October 2026",
        results: [
          {
            place: "1st",
            description:
              "Averyveryverylongresultwithoutanyspacesthatmustwrapinsteadofoverflowing",
          },
        ],
      },
    ],
  },
};
