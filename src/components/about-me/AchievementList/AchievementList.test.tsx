import { render, screen, within } from "@testing-library/react";
import AchievementList from "./AchievementList";

const achievements = [
  {
    event: "City Cup",
    location: "Opole",
    date: "1 May 2025",
    results: [{ place: "2nd", description: "100 m Freestyle" }],
  },
  {
    event: "National Championships",
    location: "Warsaw",
    date: "6 June 2026",
    results: [
      { place: "1st", description: "Overall classification" },
      { place: "3rd", description: "50 m Rescue Medley" },
    ],
  },
];

describe("<AchievementList />", () => {
  describe("when it is rendered with achievements", () => {
    beforeEach(() => {
      render(
        <AchievementList title="Achievements" achievements={achievements} />,
      );
    });

    it("shows the title as a section heading", () => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Achievements" }),
      ).toBeInTheDocument();
    });

    it("shows every event as a subheading, in order", () => {
      const events = screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

      expect(events).toEqual(["City Cup", "National Championships"]);
    });

    it("shows where and when every event took place", () => {
      expect(screen.getByText("Opole · 1 May 2025")).toBeInTheDocument();
      expect(screen.getByText("Warsaw · 6 June 2026")).toBeInTheDocument();
    });

    it("shows every result of an event with its place", () => {
      const event = screen
        .getByRole("heading", { level: 3, name: "National Championships" })
        .closest("li");

      if (!event) {
        throw new Error("The event is not in a list item");
      }

      const results = within(event).getAllByRole("listitem");

      expect(results.map((result) => result.textContent)).toEqual([
        "1stOverall classification",
        "3rd50 m Rescue Medley",
      ]);
    });
  });
});
