"use client";
import "./globals.css";

import { fontMono, fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/Providers";
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider";
import { SettingsProvider } from "@/components/SettingsProvider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ClerkProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SettingsProvider>
              {children}
            </SettingsProvider>
            <Toaster />
          </ThemeProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}
