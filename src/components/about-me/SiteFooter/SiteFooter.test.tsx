import { render, screen } from "@testing-library/react";
import SiteFooter from "./SiteFooter";

describe("<SiteFooter />", () => {
  describe("when it is rendered", () => {
    beforeEach(() => {
      render(<SiteFooter name="Jan Kowalski" year={2030} />);
    });

    it("is the page footer", () => {
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("shows the copyright with the year and the name", () => {
      expect(screen.getByText("© 2030 Jan Kowalski")).toBeInTheDocument();
    });
  });
});
