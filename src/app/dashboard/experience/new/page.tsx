"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const experienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
    logoUrl: z.string().optional().or(z.literal("")),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

export default function NewExperiencePage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ExperienceFormData>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            company: "",
            location: "",
            description: "",
            logoUrl: "",
        },
    });

    const onSubmit = async (data: ExperienceFormData) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/experiences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Experience created successfully!");
                router.push("/dashboard/experience");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to create experience");
            }
        } catch (error) {
            console.error("Error creating experience:", error);
            toast.error("Error creating experience");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Add New Experience</h1>
                    <p className="text-muted-foreground">
                        Add a new work experience to your portfolio
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Experience Details</CardTitle>
                    <CardDescription>
                        Fill in the details of your work experience
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                    id="company"
                                    {...form.register("company")}
                                    placeholder="e.g., Google, Microsoft"
                                />
                                {form.formState.errors.company && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.company.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="logoUrl">Company Logo Path (optional)</Label>
                                <Input
                                    id="logoUrl"
                                    {...form.register("logoUrl")}
                                    placeholder="/images/companies/logo.jpg"
                                />
                                {form.formState.errors.logoUrl && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.logoUrl.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    {...form.register("location")}
                                    placeholder="e.g., San Francisco, CA"
                                />
                                {form.formState.errors.location && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.location.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...form.register("description")}
                                placeholder="Describe the company and your overall experience..."
                                rows={6}
                            />
                            {form.formState.errors.description && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="mr-2 h-4 w-4" />
                                )}
                                Create Experience
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 