import { splitIntoParagraphs } from "./splitIntoParagraphs";

describe("splitIntoParagraphs", () => {
  describe("when the content is one line", () => {
    it("returns one paragraph", () => {
      expect(splitIntoParagraphs("Just one line.")).toEqual(["Just one line."]);
    });
  });

  describe("when the lines are separated by empty lines", () => {
    it("returns every line as a paragraph, without the empty lines", () => {
      expect(splitIntoParagraphs("First.\n\nSecond.\n\n\nThird.")).toEqual([
        "First.",
        "Second.",
        "Third.",
      ]);
    });
  });

  describe("when the lines follow each other directly", () => {
    it("still returns every line as a paragraph", () => {
      expect(splitIntoParagraphs("First.\nSecond.")).toEqual([
        "First.",
        "Second.",
      ]);
    });
  });

  describe("when the content has Windows line endings", () => {
    it("leaves no line ending in the paragraphs", () => {
      expect(splitIntoParagraphs("First.\r\n\r\nSecond.\r\n")).toEqual([
        "First.",
        "Second.",
      ]);
    });
  });

  describe("when lines have spaces around them or only spaces", () => {
    it("trims the paragraphs and leaves out the blank lines", () => {
      expect(splitIntoParagraphs("  First.  \n   \n\tSecond.")).toEqual([
        "First.",
        "Second.",
      ]);
    });
  });

  describe("when the content is empty", () => {
    it("returns no paragraphs", () => {
      expect(splitIntoParagraphs("")).toEqual([]);
    });
  });
});
