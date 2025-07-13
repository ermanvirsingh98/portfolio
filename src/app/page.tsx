"use client";

import { About } from "@/components/About/About";
import { Awards } from "@/components/Awards";
import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { HeaderMotion } from "@/components/Header/HeaderMotion";
import { Overview } from "@/components/Overview/Overview";
import { Projects } from "@/components/Projects";
import { QuickActions } from "@/components/QuickActions";
import { ScrollTop } from "@/components/ScrollTop";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { TeckStack } from "@/components/TechStack/TechStack";
import { AboutSkeleton } from "@/components/skeletons/AboutSkeleton";
import { EducationSkeleton } from "@/components/skeletons/EducationSkeleton";
import { ProjectsSkeleton } from "@/components/skeletons/ProjectsSkeleton";
import { SkillsSkeleton } from "@/components/skeletons/SkillsSkeleton";
import { ExperiencesSkeleton } from "@/components/skeletons/ExperiencesSkeleton";
import { SocialLinksSkeleton } from "@/components/skeletons/SocialLinksSkeleton";
import { HeaderSkeleton } from "@/components/skeletons/HeaderSkeleton";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { cn } from "@/lib/utils";

function Pattern() {
  return (
    <div
      className={cn(
        "relative flex h-4 w-full border-x border-grid",
        "before:absolute before:-left-[100vw] before:h-4 before:w-[200vw]",
        "before:bg-[image:repeating-linear-gradient(315deg,_var(--pattern-foreground)_0,_var(--pattern-foreground)_1px,_transparent_0,_transparent_50%)] before:bg-[size:10px_10px] before:[--pattern-foreground:var(--color-black)]/5 dark:before:[--pattern-foreground:var(--color-white)]/5"
      )}
    />
  );
}

export default function Home() {
  const { data, loading, error } = usePortfolioData();
  console.log(data);
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Error Loading Portfolio</h1>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderMotion />

      <div className="max-w-screen overflow-x-hidden">
        <div className="mx-auto px-4 md:max-w-3xl">
          {loading ? (
            <HeaderSkeleton />
          ) : (
            <Header overview={data?.overview} />
          )}
          <Pattern />
          <main>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
            ) : (
              <Overview data={data?.overview} experiences={data?.experiences || []} />
            )}
            <Pattern />

            {loading ? (
              <SocialLinksSkeleton />
            ) : (
              <SocialLinks data={data?.socialLinks || []} />
            )}
            <Pattern />

            {loading ? (
              <AboutSkeleton />
            ) : (
              <About data={data?.about} />
            )}
            <Pattern />

            {loading ? (
              <SkillsSkeleton />
            ) : (
              <TeckStack data={data?.skills || []} />
            )}
            <Pattern />

            {loading ? (
              <ExperiencesSkeleton />
            ) : (
              <Experiences data={data?.experiences || []} />
            )}
            <Pattern />

            {loading ? (
              <ProjectsSkeleton />
            ) : (
              <Projects data={data?.projects || []} />
            )}
            <Pattern />

            {loading ? (
              <EducationSkeleton />
            ) : (
              <Education data={data?.education || []} />
            )}
            <Pattern />

            <Awards data={data?.awards || []} />
            <Pattern />

            <Certifications data={data?.certifications || []} />
            <Pattern />
          </main>

          <Footer />
        </div>
      </div>
      <QuickActions />

      <ScrollTop className="bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] lg:bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))]" />
    </>
  );
}
