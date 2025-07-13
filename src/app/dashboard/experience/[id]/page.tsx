"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Loader2, Plus, Edit, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { use } from "react";

const experienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
    logoUrl: z.string().optional().or(z.literal("")),
});

const positionSchema = z.object({
    title: z.string().min(1, "Position title is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    isCurrent: z.boolean(),
    description: z.string().min(1, "Description is required"),
    year: z.string().optional(),
    employmentType: z.string().optional(),
    icon: z.string().optional(),
    skills: z.array(z.string()).optional(),
    order: z.number(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;
type PositionFormData = z.infer<typeof positionSchema>;

interface ExperiencePosition {
    id: string;
    title: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    year?: string;
    employmentType?: string;
    icon?: string;
    skills?: string[];
    order: number;
}

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [positions, setPositions] = useState<ExperiencePosition[]>([]);
    const [isAddingPosition, setIsAddingPosition] = useState(false);
    const [editingPositionId, setEditingPositionId] = useState<string | null>(null);
    const router = useRouter();
    const resolvedParams = use(params);

    const form = useForm<ExperienceFormData>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            company: "",
            location: "",
            description: "",
            logoUrl: "",
        },
    });

    const positionForm = useForm<PositionFormData>({
        resolver: zodResolver(positionSchema),
        defaultValues: {
            title: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
            year: "",
            employmentType: "Full-time",
            icon: "code",
            skills: [],
            order: 0,
        },
    });

    useEffect(() => {
        fetchExperience();
        fetchPositions();
    }, [resolvedParams.id]);

    const fetchExperience = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(`/api/experiences/${resolvedParams.id}`);
            if (response.ok) {
                const experience = await response.json();
                form.reset({
                    company: experience.company,
                    location: experience.location,
                    description: experience.description,
                    logoUrl: experience.logoUrl || "",
                });
            } else {
                toast.error("Failed to fetch experience");
                router.push("/dashboard/experience");
            }
        } catch (error) {
            console.error("Error fetching experience:", error);
            toast.error("Error fetching experience");
            router.push("/dashboard/experience");
        } finally {
            setIsFetching(false);
        }
    };

    const fetchPositions = async () => {
        try {
            const response = await fetch(`/api/experiences/${resolvedParams.id}/positions`);
            if (response.ok) {
                const data = await response.json();
                setPositions(data);
            }
        } catch (error) {
            console.error("Error fetching positions:", error);
        }
    };

    const onSubmit = async (data: ExperienceFormData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/experiences/${resolvedParams.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Experience updated successfully!");
                router.push("/dashboard/experience");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to update experience");
            }
        } catch (error) {
            console.error("Error updating experience:", error);
            toast.error("Error updating experience");
        } finally {
            setIsLoading(false);
        }
    };

    const onPositionSubmit = async (data: PositionFormData) => {
        try {
            const url = editingPositionId
                ? `/api/experiences/${resolvedParams.id}/positions/${editingPositionId}`
                : `/api/experiences/${resolvedParams.id}/positions`;

            const method = editingPositionId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(editingPositionId ? "Position updated successfully!" : "Position added successfully!");
                setIsAddingPosition(false);
                setEditingPositionId(null);
                positionForm.reset();
                fetchPositions();
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to save position");
            }
        } catch (error) {
            console.error("Error saving position:", error);
            toast.error("Error saving position");
        }
    };

    const handleEditPosition = (position: ExperiencePosition) => {
        setEditingPositionId(position.id);
        positionForm.reset({
            title: position.title,
            startDate: position.startDate.split('T')[0],
            endDate: position.endDate ? position.endDate.split('T')[0] : "",
            isCurrent: position.isCurrent,
            description: position.description,
            year: position.year || "",
            employmentType: position.employmentType || "Full-time",
            icon: position.icon || "code",
            skills: position.skills || [],
            order: position.order,
        });
        setIsAddingPosition(true);
    };

    const handleDeletePosition = async (positionId: string) => {
        if (!confirm("Are you sure you want to delete this position?")) {
            return;
        }

        try {
            const response = await fetch(`/api/experiences/${resolvedParams.id}/positions/${positionId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Position deleted successfully!");
                fetchPositions();
            } else {
                toast.error("Failed to delete position");
            }
        } catch (error) {
            console.error("Error deleting position:", error);
            toast.error("Error deleting position");
        }
    };

    const handleCancelPosition = () => {
        setIsAddingPosition(false);
        setEditingPositionId(null);
        positionForm.reset();
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
                        <p className="text-muted-foreground">
                            Update your work experience details
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
                    <p className="text-muted-foreground">
                        Update your work experience details and positions
                    </p>
                </div>
            </div>

            {/* Experience Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Experience Details</CardTitle>
                    <CardDescription>
                        Update the details of your work experience
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
                                Update Experience
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Positions Management */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Experience Positions</CardTitle>
                            <CardDescription>
                                Manage individual positions within this experience
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => setIsAddingPosition(true)}
                            disabled={isAddingPosition}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Position
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {positions.length === 0 ? (
                        <div className="text-center py-8">
                            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No positions added yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {positions.map((position) => (
                                <div key={position.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-medium">{position.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {position.employmentType} • {position.year}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {position.isCurrent && (
                                                <Badge variant="default" className="bg-green-100 text-green-800">
                                                    Current
                                                </Badge>
                                            )}
                                            <Button
                                                variant="outline"
                                                onClick={() => handleEditPosition(position)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleDeletePosition(position.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    {position.skills && position.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {position.skills.slice(0, 5).map((skill, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {position.skills.length > 5 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{position.skills.length - 5} more
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {position.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Position Form */}
            {isAddingPosition && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {editingPositionId ? "Edit Position" : "Add New Position"}
                        </CardTitle>
                        <CardDescription>
                            {editingPositionId ? "Update position details" : "Add a new position to this experience"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={positionForm.handleSubmit(onPositionSubmit)} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="positionTitle">Position Title</Label>
                                    <Input
                                        id="positionTitle"
                                        {...positionForm.register("title")}
                                        placeholder="e.g., Senior Frontend Developer"
                                    />
                                    {positionForm.formState.errors.title && (
                                        <p className="text-sm text-red-500">
                                            {positionForm.formState.errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="employmentType">Employment Type</Label>
                                    <select
                                        id="employmentType"
                                        {...positionForm.register("employmentType")}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="positionStartDate">Start Date</Label>
                                    <Input
                                        id="positionStartDate"
                                        type="date"
                                        {...positionForm.register("startDate")}
                                    />
                                    {positionForm.formState.errors.startDate && (
                                        <p className="text-sm text-red-500">
                                            {positionForm.formState.errors.startDate.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="positionEndDate">End Date (leave empty if current)</Label>
                                    <Input
                                        id="positionEndDate"
                                        type="date"
                                        {...positionForm.register("endDate")}
                                        disabled={positionForm.watch("isCurrent")}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="year">Year Display</Label>
                                    <Input
                                        id="year"
                                        {...positionForm.register("year")}
                                        placeholder="e.g., 10.2021 - present"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <select
                                        id="icon"
                                        {...positionForm.register("icon")}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="code">Code</option>
                                        <option value="design">Design</option>
                                        <option value="education">Education</option>
                                        <option value="briefcase">Briefcase</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="positionIsCurrent"
                                    checked={positionForm.watch("isCurrent")}
                                    onCheckedChange={(checked) => positionForm.setValue("isCurrent", checked)}
                                />
                                <Label htmlFor="positionIsCurrent">Currently in this position</Label>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="positionDescription">Description</Label>
                                <Textarea
                                    id="positionDescription"
                                    {...positionForm.register("description")}
                                    placeholder="Describe your role, responsibilities, and achievements..."
                                    rows={6}
                                />
                                {positionForm.formState.errors.description && (
                                    <p className="text-sm text-red-500">
                                        {positionForm.formState.errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancelPosition}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingPositionId ? "Update Position" : "Add Position"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 