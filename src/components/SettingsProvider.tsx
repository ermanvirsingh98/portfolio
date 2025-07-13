"use client";

import { useEffect } from "react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

interface SettingsProviderProps {
    children: React.ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
    const { data } = usePortfolioData();

    useEffect(() => {
        if (data?.settings) {
            // Update page title
            if (data.settings.siteTitle) {
                document.title = data.settings.siteTitle;
            }

            // Update meta description
            if (data.settings.siteDescription) {
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    metaDescription.setAttribute('content', data.settings.siteDescription);
                } else {
                    const newMetaDescription = document.createElement('meta');
                    newMetaDescription.name = 'description';
                    newMetaDescription.content = data.settings.siteDescription;
                    document.head.appendChild(newMetaDescription);
                }
            }

            // Apply theme setting
            if (data.settings.theme && data.settings.theme !== 'system') {
                document.documentElement.setAttribute('data-theme', data.settings.theme);
            }
        }
    }, [data?.settings]);

    return <>{children}</>;
} 