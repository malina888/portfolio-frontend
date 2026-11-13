import AchievementList from "@/components/about-me/AchievementList/AchievementList";
import ContactLinks from "@/components/about-me/ContactLinks/ContactLinks";
import HighlightList from "@/components/about-me/HighlightList/HighlightList";
import ProfileHeader from "@/components/about-me/ProfileHeader/ProfileHeader";
import ProjectList from "@/components/about-me/ProjectList/ProjectList";
import SiteFooter from "@/components/about-me/SiteFooter/SiteFooter";
import TagList from "@/components/about-me/TagList/TagList";
import TextSection from "@/components/about-me/TextSection/TextSection";
import {
  ABOUT_ME,
  ACHIEVEMENTS,
  AUTHOR_NAME,
  AUTHOR_PORTRAIT,
  AUTHOR_TAGLINE,
  CONTACT_LINKS,
  CONTACT_TEXT,
  CURRENTLY_LEARNING,
  GITHUB_URL,
  HIGHLIGHTS,
  INTERESTS,
  PROJECTS,
} from "@/constants/about-me";

const Index = () => {
  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-8 sm:py-14">
        <ProfileHeader
          name={AUTHOR_NAME}
          tagline={AUTHOR_TAGLINE}
          portrait={AUTHOR_PORTRAIT}
          links={[{ label: "GitHub", url: GITHUB_URL }]}
        />
        <HighlightList highlights={HIGHLIGHTS} />
        <TextSection title="About me" text={ABOUT_ME} />
        <AchievementList title="Achievements" achievements={ACHIEVEMENTS} />
        <ProjectList title="Projects" projects={PROJECTS} />
        <TagList
          title="Currently learning"
          tags={CURRENTLY_LEARNING}
          variant="primary"
        />
        <TagList title="Interests" tags={INTERESTS} />
        <ContactLinks
          title="Contact"
          text={CONTACT_TEXT}
          links={CONTACT_LINKS}
        />
      </main>
      <SiteFooter name={AUTHOR_NAME} year={new Date().getFullYear()} />
    </>
  );
};

export default Index;
