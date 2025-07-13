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
import { Plus, Edit, Trash2, Save, X, Loader2, GraduationCap, Calendar, MapPin } from "lucide-react";
import { api } from "@/lib/api";

const educationSchema = z.object({
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field of study is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    isCurrent: z.boolean(),
    description: z.string().min(1, "Description is required"),
    logoUrl: z.string().optional().or(z.literal("")),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    description: string;
    logoUrl: string | null;
    order: number;
}

export default function EducationPage() {
    const [educations, setEducations] = useState<Education[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const form = useForm<EducationFormData>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            institution: "",
            degree: "",
            field: "",
            location: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
            logoUrl: "",
        },
    });

    // Fetch education from API
    const fetchEducation = async () => {
        try {
            setIsFetching(true);
            const data = await api.education.get();
            setEducations(data);
        } catch (error) {
            console.error("Error fetching education:", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    const onSubmit = async (data: EducationFormData) => {
        setIsLoading(true);
        try {
            if (editingId) {
                // Update existing education
                await api.education.update(editingId, data);
                setEditingId(null);
            } else {
                // Add new education
                await api.education.save(data);
                setIsAdding(false);
            }

            await fetchEducation(); // Refresh data
            form.reset();
        } catch (error) {
            console.error("Error saving education:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (education: Education) => {
        setEditingId(education.id);
        form.reset({
            institution: education.institution,
            degree: education.degree,
            field: education.field,
            location: education.location || "",
            startDate: education.startDate.split('T')[0], // Convert to YYYY-MM-DD
            endDate: education.endDate ? education.endDate.split('T')[0] : "",
            isCurrent: education.isCurrent,
            description: education.description,
            logoUrl: education.logoUrl || "",
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this education entry?")) {
            try {
                await api.education.delete(id);
                await fetchEducation(); // Refresh data
            } catch (error) {
                console.error("Error deleting education:", error);
            }
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        form.reset();
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Education</h1>
                    <p className="text-muted-foreground">
                        Manage your educational background
                    </p>
                </div>
                <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                </Button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingId !== null ? "Edit Education" : "Add New Education"}</CardTitle>
                        <CardDescription>
                            {editingId !== null ? "Update education details" : "Add a new education entry to your portfolio"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="institution">Institution Name</Label>
                                    <Input
                                        id="institution"
                                        {...form.register("institution")}
                                        placeholder="e.g., Stanford University"
                                    />
                                    {form.formState.errors.institution && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.institution.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="logoUrl">Institution Logo Path (optional)</Label>
                                    <Input
                                        id="logoUrl"
                                        {...form.register("logoUrl")}
                                        placeholder="/images/companies/university.jpg"
                                    />
                                    {form.formState.errors.logoUrl && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.logoUrl.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="degree">Degree</Label>
                                    <Input
                                        id="degree"
                                        {...form.register("degree")}
                                        placeholder="e.g., Bachelor's, Master's, PhD"
                                    />
                                    {form.formState.errors.degree && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.degree.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="field">Field of Study</Label>
                                    <Input
                                        id="field"
                                        {...form.register("field")}
                                        placeholder="e.g., Computer Science, Engineering"
                                    />
                                    {form.formState.errors.field && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.field.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location (optional)</Label>
                                    <Input
                                        id="location"
                                        {...form.register("location")}
                                        placeholder="e.g., San Francisco, CA"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        {...form.register("startDate")}
                                    />
                                    {form.formState.errors.startDate && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.startDate.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="endDate">End Date (leave empty if current)</Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        {...form.register("endDate")}
                                        disabled={form.watch("isCurrent")}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="isCurrent"
                                    {...form.register("isCurrent")}
                                    className="rounded"
                                />
                                <Label htmlFor="isCurrent">Currently studying here</Label>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    {...form.register("description")}
                                    placeholder="Describe your studies, achievements, and relevant coursework..."
                                    rows={4}
                                />
                                {form.formState.errors.description && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={handleCancel}>
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                    )}
                                    {editingId !== null ? "Update" : "Save"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Education List */}
            <div className="space-y-4">
                {educations.map((education) => (
                    <Card key={education.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {education.logoUrl && (
                                        <img
                                            src={education.logoUrl}
                                            alt={`${education.institution} logo`}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <CardTitle className="text-lg">{education.institution}</CardTitle>
                                        <CardDescription className="flex items-center space-x-2">
                                            <GraduationCap className="h-4 w-4" />
                                            <span>{education.degree} in {education.field}</span>
                                            {education.location && (
                                                <>
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{education.location}</span>
                                                </>
                                            )}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(education.startDate).getFullYear()} -
                                        {education.isCurrent ? " Present" : education.endDate ? new Date(education.endDate).getFullYear() : ""}
                                    </span>
                                    {education.isCurrent && (
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                            Current
                                        </span>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(education)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(education.id)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{education.description}</p>
                        </CardContent>
                    </Card>
                ))}

                {educations.length === 0 && !isFetching && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground text-center">
                                No education entries added yet. Click "Add Education" to get started.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 