"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, Palette, Globe, Shield, Download, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";
import { toast } from "sonner";

const settingsSchema = z.object({
    siteTitle: z.string().min(1, "Site title is required"),
    siteDescription: z.string().min(1, "Site description is required"),
    theme: z.string().min(1, "Theme is required"),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            siteTitle: "My Portfolio",
            siteDescription: "A creative portfolio showcasing my work and experience",
            theme: "system",
        },
    });

    // Load existing settings
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setIsLoadingData(true);
            const settings = await api.settings.get();

            if (settings && Object.keys(settings).length > 0) {
                form.reset({
                    siteTitle: settings.siteTitle || "My Portfolio",
                    siteDescription: settings.siteDescription || "A creative portfolio showcasing my work and experience",
                    theme: settings.theme || "system",
                });
            }
        } catch (error) {
            console.error("Error loading settings:", error);
            toast.error("Failed to load settings");
        } finally {
            setIsLoadingData(false);
        }
    };

    const onSubmit = async (data: SettingsFormData) => {
        setIsLoading(true);
        try {
            await api.settings.save(data);
            setIsSaved(true);
            toast.success("Settings saved successfully!");
            setTimeout(() => setIsSaved(false), 3000);
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportData = async () => {
        try {
            const [
                overview,
                experiences,
                education,
                skills,
                projects,
                awards,
                certifications,
                socialLinks,
                about
            ] = await Promise.all([
                api.overview.get(),
                api.experiences.get(),
                api.education.get(),
                api.skills.get(),
                api.projects.get(),
                api.awards.get(),
                api.certifications.get(),
                api.socialLinks.get(),
                api.about.get(),
            ]);

            const data = {
                overview,
                experiences,
                education,
                skills,
                projects,
                awards,
                certifications,
                socialLinks,
                about,
                exportDate: new Date().toISOString(),
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast.success("Portfolio data exported successfully!");
        } catch (error) {
            console.error("Error exporting data:", error);
            toast.error("Failed to export data");
        }
    };

    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);
                console.log("Imported data:", data);
                toast.info("Data import functionality will be implemented in a future update");
            } catch (error) {
                console.error("Error parsing imported data:", error);
                toast.error("Invalid JSON file");
            }
        };
        reader.readAsText(file);
    };

    if (isLoadingData) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your portfolio settings and preferences
                    </p>
                </div>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your portfolio settings and preferences
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* SEO Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            SEO & Meta Information
                        </CardTitle>
                        <CardDescription>
                            Configure your portfolio's search engine optimization settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="siteTitle">Site Title</Label>
                            <Input
                                id="siteTitle"
                                {...form.register("siteTitle")}
                                placeholder="Your Name - Portfolio"
                            />
                            {form.formState.errors.siteTitle && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.siteTitle.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="siteDescription">Site Description</Label>
                            <Textarea
                                id="siteDescription"
                                {...form.register("siteDescription")}
                                placeholder="A brief description of your portfolio"
                                rows={3}
                            />
                            {form.formState.errors.siteDescription && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.siteDescription.message}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            Appearance
                        </CardTitle>
                        <CardDescription>
                            Customize the look of your portfolio
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="theme">Theme</Label>
                            <select
                                id="theme"
                                {...form.register("theme")}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="system">System (Auto)</option>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                            {form.formState.errors.theme && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.theme.message}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Data Management */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Data Management
                        </CardTitle>
                        <CardDescription>
                            Export and import your portfolio data
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleExportData}
                                className="flex items-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Export Data
                            </Button>

                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImportData}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Import Data
                                </Button>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Export your portfolio data as JSON for backup or import it from a previous export.
                        </p>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="min-w-[120px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Settings
                            </>
                        )}
                    </Button>
                </div>

                {isSaved && (
                    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                        Settings saved successfully!
                    </div>
                )}
            </form>
        </div>
    );
} 