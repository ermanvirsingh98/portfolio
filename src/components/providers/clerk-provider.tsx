"use client";

import { ClerkProvider } from "@clerk/nextjs";

export function ClerkProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider
            appearance={{
                elements: {
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    card: "bg-background border-border",
                    headerTitle: "text-foreground",
                    headerSubtitle: "text-muted-foreground",
                    socialButtonsBlockButton: "bg-background border-border text-foreground hover:bg-accent",
                    formFieldLabel: "text-foreground",
                    formFieldInput: "bg-background border-border text-foreground",
                    footerActionLink: "text-primary hover:text-primary/90",
                },
            }}
        >
            {children}
        </ClerkProvider>
    );
} 