import { render, screen, within } from "@testing-library/react";
import TagList from "./TagList";

describe("<TagList />", () => {
  describe("when it is rendered with tags", () => {
    beforeEach(() => {
      render(<TagList title="Interests" tags={["Gaming", "Sport"]} />);
    });

    it("shows the title as a section heading", () => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Interests" }),
      ).toBeInTheDocument();
    });

    it("shows every tag as a list item, in order", () => {
      const items = within(screen.getByRole("list")).getAllByRole("listitem");

      expect(items.map((item) => item.textContent)).toEqual([
        "Gaming",
        "Sport",
      ]);
    });
  });

  describe("when the primary variant is chosen", () => {
    it("still shows every tag", () => {
      render(
        <TagList
          title="Currently learning"
          tags={["React", "TypeScript"]}
          variant="primary"
        />,
      );

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });
  });
});
