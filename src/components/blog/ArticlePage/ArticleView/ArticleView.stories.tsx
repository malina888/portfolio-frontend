import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { fn } from "storybook/test";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import ArticleView from "./ArticleView";

const article = {
  ...MOCK_ARTICLES[1],
  content: [
    "Building a read API with Nest.js and Prisma.",
    "First I described the article table in the Prisma schema and ran a migration. Then I added a seed, so every developer starts with the same four articles.",
    "The last part was the controller: one endpoint for the list and one for a single article, both checked with end-to-end tests.",
  ].join("\n\n"),
};

const meta = {
  title: "blog/ArticlePage/ArticleView",
  component: ArticleView,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // The back link is a router <Link>, which only works inside a router.
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    state: { status: "success", article },
    onRetry: fn(),
  },
} satisfies Meta<typeof ArticleView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticle: Story = {};

export const Loading: Story = {
  args: {
    state: { status: "loading" },
  },
};

export const NotFound: Story = {
  args: {
    state: { status: "not-found" },
  },
};

export const Failed: Story = {
  args: {
    state: { status: "error" },
  },
};

export const WithHtmlInContent: Story = {
  args: {
    state: {
      status: "success",
      article: {
        ...article,
        content:
          '<script>alert("XSS")</script>\n\n<b>This is not bold.</b> <img src="x" onerror="alert(1)">',
      },
    },
  },
};

export const WithVeryLongTitle: Story = {
  args: {
    state: {
      status: "success",
      article: {
        ...article,
        title:
          "Averyveryverylongarticletitlewithoutanyspacesthatmustwrapinsteadofmakingthepagescrollsideways",
      },
    },
  },
};
