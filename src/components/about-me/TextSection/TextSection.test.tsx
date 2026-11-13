import { render, screen } from "@testing-library/react";
import TextSection from "./TextSection";

describe("<TextSection />", () => {
  describe("when it is rendered", () => {
    beforeEach(() => {
      render(<TextSection title="About me" text="I like testing." />);
    });

    it("shows the title as a section heading", () => {
      expect(
        screen.getByRole("heading", { level: 2, name: "About me" }),
      ).toBeInTheDocument();
    });

    it("names the section after its title", () => {
      expect(
        screen.getByRole("region", { name: "About me" }),
      ).toBeInTheDocument();
    });

    it("shows the text", () => {
      expect(screen.getByText("I like testing.")).toBeInTheDocument();
    });
  });
});
