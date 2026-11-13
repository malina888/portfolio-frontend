import type { Highlight } from "@/types/about-me";

interface Props {
  highlights: Highlight[];
}

const HighlightList = ({ highlights }: Props) => {
  if (highlights.length === 0) {
    return null;
  }

  return (
    <ul aria-label="Highlights" className="grid gap-4 sm:grid-cols-3">
      {highlights.map((highlight) => (
        <li
          key={highlight.label}
          className="flex flex-col gap-1 rounded-3xl bg-gi-ash p-5 text-center"
        >
          <span className="text-2xl font-extrabold text-gi-primary wrap-anywhere">
            {highlight.value}
          </span>
          <span className="text-sm text-gi-dark-gray wrap-anywhere">
            {highlight.label}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default HighlightList;
