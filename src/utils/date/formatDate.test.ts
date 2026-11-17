import { formatDate } from "./formatDate";

describe("formatDate", () => {
  describe("when given an ISO date", () => {
    it("returns the day, the month's name and the year", () => {
      expect(formatDate("2026-11-01T08:00:00.000Z")).toBe("1 November 2026");
    });
  });

  describe.each([
    ["just after midnight", "2026-11-01T00:30:00.000Z"],
    ["just before midnight", "2026-11-01T23:30:00.000Z"],
  ])("when the date is %s in UTC", (_, isoDate) => {
    it("returns the day in UTC, whatever the visitor's time zone", () => {
      expect(formatDate(isoDate)).toBe("1 November 2026");
    });
  });
});
