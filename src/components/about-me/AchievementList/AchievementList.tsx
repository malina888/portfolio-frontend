import { Badge, Section } from "@gi-org-pl/athena";
import type { Achievement } from "@/types/about-me";

interface Props {
  title: string;
  achievements: Achievement[];
}

const AchievementList = ({ title, achievements }: Props) => {
  return (
    <Section title={title}>
      <ol className="flex flex-col gap-6">
        {achievements.map((achievement) => (
          <li key={achievement.event} className="flex flex-col gap-2">
            <h3 className="font-bold text-gi-dark-primary wrap-anywhere">
              {achievement.event}
            </h3>
            <p className="text-sm text-gi-dark-gray">
              {achievement.location} · {achievement.date}
            </p>
            <ul className="flex flex-col gap-2">
              {achievement.results.map((result) => (
                <li
                  key={`${result.place}-${result.description}`}
                  className="flex items-start gap-2"
                >
                  <span className="shrink-0">
                    <Badge variant="primary">{result.place}</Badge>
                  </span>
                  <span className="wrap-anywhere">{result.description}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default AchievementList;
