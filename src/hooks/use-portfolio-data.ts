import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export interface PortfolioData {
  overview: any;
  about: any;
  projects: any[];
  skills: any[];
  socialLinks: any[];
  experiences: any[];
  education: any[];
  awards: any[];
  certifications: any[];
  settings: any;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [
          overview,
          about,
          projects,
          skills,
          socialLinks,
          experiences,
          education,
          awards,
          certifications,
          settings,
        ] = await Promise.allSettled([
          api.overview.get(),
          api.about.get(),
          api.projects.get(),
          api.skills.get(),
          api.socialLinks.get(),
          api.experiences.get(),
          api.education.get(),
          api.awards.get(),
          api.certifications.get(),
          api.settings.get(),
        ]);

        setData({
          overview: overview.status === "fulfilled" ? overview.value : null,
          about: about.status === "fulfilled" ? about.value : null,
          projects: projects.status === "fulfilled" ? projects.value : [],
          skills: skills.status === "fulfilled" ? skills.value : [],
          socialLinks:
            socialLinks.status === "fulfilled" ? socialLinks.value : [],
          experiences:
            experiences.status === "fulfilled" ? experiences.value : [],
          education: education.status === "fulfilled" ? education.value : [],
          awards: awards.status === "fulfilled" ? awards.value : [],
          certifications:
            certifications.status === "fulfilled" ? certifications.value : [],
          settings: settings.status === "fulfilled" ? settings.value : null,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
