import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticleCard from "./ArticleCard";

const meta = {
  title: "blog/BlogSection/ArticleFeed/ArticleCard",
  component: ArticleCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  // The title is a router <Link>, which only works inside a router.
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    article: MOCK_ARTICLES[0],
  },
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVeryLongTitle: Story = {
  args: {
    article: {
      ...MOCK_ARTICLES[0],
      title:
        "Averyveryverylongarticletitlewithoutanyspacesthatmustwrapinsteadofmakingthepagescrollsideways",
    },
  },
};
