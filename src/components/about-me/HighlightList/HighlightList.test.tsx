import { render, screen, within } from "@testing-library/react";
import HighlightList from "./HighlightList";

describe("<HighlightList />", () => {
  describe("when it is rendered with highlights", () => {
    beforeEach(() => {
      render(
        <HighlightList
          highlights={[
            { value: "10", label: "years of training" },
            { value: "1st", label: "place in the championships" },
          ]}
        />,
      );
    });

    it("shows a labelled list with one item per highlight", () => {
      const list = screen.getByRole("list", { name: "Highlights" });

      expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    });

    it("shows the value and the label of every highlight", () => {
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("years of training")).toBeInTheDocument();
      expect(screen.getByText("1st")).toBeInTheDocument();
      expect(
        screen.getByText("place in the championships"),
      ).toBeInTheDocument();
    });
  });

  describe("when there are no highlights", () => {
    it("renders nothing", () => {
      const { container } = render(<HighlightList highlights={[]} />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
