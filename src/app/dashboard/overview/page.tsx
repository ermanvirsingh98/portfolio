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
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Save, Loader2, User, Briefcase, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

const overviewSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    displayName: z.string().min(1, "Display name is required"),
    username: z.string().min(1, "Username is required"),
    gender: z.string().optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    dateOfBirth: z.string().optional(),
    jobTitle: z.string().optional(),
    avatar: z.string().optional(),
    ogImage: z.string().optional(),
    keywords: z.string().optional(),
    dateCreated: z.string().optional(),
});

type OverviewFormData = z.infer<typeof overviewSchema>;

interface Experience {
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    logoUrl?: string;
    order: number;
    positions?: Array<{
        id: string;
        title: string;
        startDate: string;
        endDate?: string;
        isCurrent: boolean;
        description: string;
        experienceId: string;
        order: number;
    }>;
}

export default function OverviewPage() {
    const [overview, setOverview] = useState<any>(null);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const overviewForm = useForm<OverviewFormData>({
        resolver: zodResolver(overviewSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            displayName: "",
            username: "",
            gender: "",
            bio: "",
            address: "",
            phoneNumber: "",
            email: "",
            website: "",
            dateOfBirth: "",
            jobTitle: "",
            avatar: "",
            ogImage: "",
            keywords: "",
            dateCreated: "",
        },
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [overviewData, experiencesData] = await Promise.all([
                api.overview.get(),
                api.experiences.get(),
            ]);

            if (overviewData) {
                setOverview(overviewData);

                // Populate form with existing data
                overviewForm.reset({
                    firstName: overviewData.firstName || "",
                    lastName: overviewData.lastName || "",
                    displayName: overviewData.displayName || "",
                    username: overviewData.username || "",
                    gender: overviewData.gender || "",
                    bio: overviewData.bio || "",
                    address: overviewData.address || "",
                    phoneNumber: overviewData.phoneNumber || "",
                    email: overviewData.email || "",
                    website: overviewData.website || "",
                    dateOfBirth: overviewData.dateOfBirth || "",
                    jobTitle: overviewData.jobTitle || "",
                    avatar: overviewData.avatar || "",
                    ogImage: overviewData.ogImage || "",
                    keywords: overviewData.keywords || "",
                    dateCreated: overviewData.dateCreated || "",
                });
            }

            if (experiencesData) {
                setExperiences(experiencesData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const onOverviewSubmit = async (data: OverviewFormData) => {
        setIsLoading(true);
        try {
            await api.overview.save(data);
            await fetchData();
        } catch (error) {
            console.error("Error saving overview:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Get current jobs from experiences
    const currentJobs = experiences.filter(exp => {
        // Check if any position in this experience is current
        return exp.positions?.some(position => position.isCurrent) || false;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Overview Management</h1>
                <p className="text-muted-foreground">
                    Manage your personal information and view current jobs
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>
                            Update your personal details and contact information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={overviewForm.handleSubmit(onOverviewSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        {...overviewForm.register("firstName")}
                                        placeholder="John"
                                    />
                                    {overviewForm.formState.errors.firstName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {overviewForm.formState.errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        {...overviewForm.register("lastName")}
                                        placeholder="Doe"
                                    />
                                    {overviewForm.formState.errors.lastName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {overviewForm.formState.errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    {...overviewForm.register("displayName")}
                                    placeholder="John Doe"
                                />
                                {overviewForm.formState.errors.displayName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {overviewForm.formState.errors.displayName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    {...overviewForm.register("username")}
                                    placeholder="johndoe"
                                />
                                {overviewForm.formState.errors.username && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {overviewForm.formState.errors.username.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="bio">Bio</Label>
                                <RichTextEditor
                                    value={overviewForm.watch("bio")}
                                    onChange={(value) => overviewForm.setValue("bio", value)}
                                    placeholder="A brief description about yourself..."
                                />
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    {...overviewForm.register("address")}
                                    placeholder="City, State (Country)"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    {...overviewForm.register("phoneNumber")}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...overviewForm.register("email")}
                                    placeholder="john@example.com"
                                />
                                {overviewForm.formState.errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {overviewForm.formState.errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    {...overviewForm.register("website")}
                                    placeholder="https://example.com"
                                />
                                {overviewForm.formState.errors.website && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {overviewForm.formState.errors.website.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="jobTitle">Job Title</Label>
                                <Input
                                    id="jobTitle"
                                    {...overviewForm.register("jobTitle")}
                                    placeholder="Software Developer"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Overview
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Current Jobs from Experience */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Current Jobs
                        </CardTitle>
                        <CardDescription>
                            Your current jobs from the Experience section
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Multiple Current Jobs Info */}
                            {(() => {
                                const totalCurrentPositions = currentJobs.reduce((total, exp) => {
                                    return total + (exp.positions?.filter(pos => pos.isCurrent).length || 0);
                                }, 0);

                                if (totalCurrentPositions > 1) {
                                    return (
                                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                                            <p className="text-sm text-blue-700">
                                                💡 You have {totalCurrentPositions} current positions. All of them will be displayed on your portfolio overview.
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })()}

                            {currentJobs.length > 0 ? (
                                <div className="space-y-3">
                                    {currentJobs.map((experience) => {
                                        // Get all current positions for this experience
                                        const currentPositions = experience.positions?.filter(position => position.isCurrent) || [];

                                        return currentPositions.map((position) => (
                                            <div
                                                key={`${experience.id}-${position.id}`}
                                                className="flex items-center justify-between p-3 border rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium">{position.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {experience.company}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {position.startDate} - {position.isCurrent ? 'Present' : position.endDate}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {experience.logoUrl && (
                                                        <Button
                                                            variant="outline"
                                                            asChild
                                                        >
                                                            <a href={experience.logoUrl} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ));
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground mb-4">
                                        No current positions found. Add your current position in the Experience section.
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t">
                                <Link href="/dashboard/experience">
                                    <Button variant="outline" className="w-full">
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        Manage Experience
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 