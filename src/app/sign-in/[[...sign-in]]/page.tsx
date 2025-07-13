"use client";

import { SignIn } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Portfolio Admin</CardTitle>
                    <CardDescription>
                        Sign in to access your portfolio dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignIn
                        appearance={{
                            elements: {
                                formButtonPrimary: "bg-primary hover:bg-primary/90",
                                card: "bg-transparent shadow-none",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton: "bg-background border-border text-foreground hover:bg-accent",
                                formFieldLabel: "text-foreground",
                                formFieldInput: "bg-background border-border text-foreground",
                                footerActionLink: "text-primary hover:text-primary/90",
                            },
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
} 