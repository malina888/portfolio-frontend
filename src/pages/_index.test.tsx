import { render, screen } from "@testing-library/react";
import { AUTHOR_NAME } from "@/constants/about-me";
import Index from "./_index";

describe("<Index /> home page", () => {
  describe("when a visitor opens it", () => {
    beforeEach(() => {
      render(<Index />);
    });

    it("shows the author's name as the only main heading", () => {
      const mainHeadings = screen.getAllByRole("heading", { level: 1 });

      expect(mainHeadings).toHaveLength(1);
      expect(mainHeadings[0]).toHaveTextContent(AUTHOR_NAME);
    });

    it("puts the content in the main landmark", () => {
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });
});
