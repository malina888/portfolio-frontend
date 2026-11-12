import ProfileHeader from "@/components/about-me/ProfileHeader/ProfileHeader";
import {
  AUTHOR_NAME,
  AUTHOR_PORTRAIT,
  AUTHOR_TAGLINE,
  GITHUB_URL,
} from "@/constants/about-me";

const Index = () => {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-8 sm:py-14">
      <ProfileHeader
        name={AUTHOR_NAME}
        tagline={AUTHOR_TAGLINE}
        portrait={AUTHOR_PORTRAIT}
        links={[{ label: "GitHub", url: GITHUB_URL }]}
      />
    </main>
  );
};

export default Index;
