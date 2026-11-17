// The API sends dates in UTC, so they are shown in UTC too. This way an article
// published on 1 November shows 1 November in every time zone.
const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// Turns an ISO date, such as "2026-11-01T08:00:00.000Z", into "1 November 2026".
export const formatDate = (isoDate: string) =>
  DATE_FORMAT.format(new Date(isoDate));
