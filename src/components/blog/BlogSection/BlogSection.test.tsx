import { fireEvent, render, screen } from "@testing-library/react";
import { AxiosError } from "axios";
import { getArticles } from "@/services/api/client/getArticles";
import { MOCK_ARTICLES } from "@/services/api/schemas/article.mock";
import BlogSection from "./BlogSection";

vi.mock("@/services/api/client/getArticles");

const getArticlesMock = vi.mocked(getArticles);

describe("<BlogSection />", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("when the API answers with articles", () => {
    beforeEach(() => {
      getArticlesMock.mockResolvedValue(MOCK_ARTICLES);
      render(<BlogSection title="Blog" />);
    });

    it("shows the title as a section heading", () => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Blog" }),
      ).toBeInTheDocument();
    });

    it("shows that the articles are loading, then the articles", async () => {
      expect(screen.getByRole("status")).toHaveTextContent("Loading articles…");
      expect(
        await screen.findByRole("heading", { level: 3, name: "Hello, world" }),
      ).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  describe("when loading fails and the visitor tries again", () => {
    it("loads the articles again", async () => {
      getArticlesMock
        .mockRejectedValueOnce(new AxiosError("Network Error", "ERR_NETWORK"))
        .mockResolvedValueOnce(MOCK_ARTICLES);
      render(<BlogSection title="Blog" />);

      fireEvent.click(await screen.findByRole("button", { name: "Try again" }));

      expect(
        await screen.findByRole("heading", { level: 3, name: "Hello, world" }),
      ).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(getArticlesMock).toHaveBeenCalledTimes(2);
    });
  });
});
