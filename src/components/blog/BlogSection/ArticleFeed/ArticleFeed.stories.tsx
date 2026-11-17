import { Section } from "@gi-org-pl/athena";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticleFeed from "./ArticleFeed";

const meta = {
  title: "blog/BlogSection/ArticleFeed",
  component: ArticleFeed,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Section title="Blog">
        <Story />
      </Section>
    ),
  ],
  args: {
    state: { status: "success", articles: MOCK_ARTICLES },
    onRetry: fn(),
  },
} satisfies Meta<typeof ArticleFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticles: Story = {};

export const Loading: Story = {
  args: {
    state: { status: "loading" },
  },
};

export const Empty: Story = {
  args: {
    state: { status: "success", articles: [] },
  },
};

export const Failed: Story = {
  args: {
    state: { status: "error" },
  },
};

export const WithVeryLongTitle: Story = {
  args: {
    state: {
      status: "success",
      articles: [
        {
          ...MOCK_ARTICLES[0],
          title:
            "Averyveryverylongarticletitlewithoutanyspacesthatmustwrapinsteadofmakingthepagescrollsideways",
        },
      ],
    },
  },
};
