import { render, screen } from "@testing-library/react";
import ContactLinks from "./ContactLinks";

describe("<ContactLinks />", () => {
  describe("when it is rendered with links", () => {
    beforeEach(() => {
      render(
        <ContactLinks
          title="Contact"
          text="Find me here:"
          links={[
            { label: "GitHub", url: "https://github.com/jan-kowalski" },
            { label: "Blog", url: "https://example.com/blog" },
          ]}
        />,
      );
    });

    it("shows the title as a section heading", () => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Contact" }),
      ).toBeInTheDocument();
    });

    it("shows the text above the links", () => {
      expect(screen.getByText("Find me here:")).toBeInTheDocument();
    });

    it("shows every link with its address", () => {
      expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
        "href",
        "https://github.com/jan-kowalski",
      );
      expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
        "href",
        "https://example.com/blog",
      );
    });
  });
});
