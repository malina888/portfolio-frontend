import { render, screen } from "@testing-library/react";
import ProfileHeader from "./ProfileHeader";

const portrait = { src: "portrait.jpg", alt: "Portrait photo of Jan Kowalski" };
const links = [
  { label: "GitHub", url: "https://github.com/jan-kowalski" },
  { label: "Blog", url: "https://example.com/blog" },
];

describe("<ProfileHeader />", () => {
  describe("when it is rendered with links", () => {
    beforeEach(() => {
      render(
        <ProfileHeader
          name="Jan Kowalski"
          tagline="Beginner web developer."
          portrait={portrait}
          links={links}
        />,
      );
    });

    it("shows the name as the main heading", () => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Jan Kowalski" }),
      ).toBeInTheDocument();
    });

    it("shows the tagline", () => {
      expect(screen.getByText("Beginner web developer.")).toBeInTheDocument();
    });

    it("shows the portrait with its text alternative", () => {
      expect(
        screen.getByRole("img", { name: "Portrait photo of Jan Kowalski" }),
      ).toHaveAttribute("src", "portrait.jpg");
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

  describe("when it is rendered without links", () => {
    it("does not show the list of links", () => {
      render(
        <ProfileHeader
          name="Jan Kowalski"
          tagline="Beginner web developer."
          portrait={portrait}
          links={[]}
        />,
      );

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });
});
