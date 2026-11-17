// Every line of the content is a paragraph. Empty lines only separate them.
export const splitIntoParagraphs = (content: string) =>
  content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
