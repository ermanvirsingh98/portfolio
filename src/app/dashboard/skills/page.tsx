"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Save, X, Loader2, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";

const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    category: z.string().min(1, "Category is required"),
    iconUrl: z.string().optional().or(z.literal("")),
    level: z.number().min(1).max(5),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface Skill {
    id: string;
    name: string;
    category: string;
    iconUrl: string | null;
    level: number;
    order: number;
}

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const form = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            name: "",
            category: "",
            iconUrl: "",
            level: 3,
        },
    });

    // Fetch skills from API
    const fetchSkills = async () => {
        try {
            setIsFetching(true);
            const data = await api.skills.get();
            setSkills(data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const onSubmit = async (data: SkillFormData) => {
        setIsLoading(true);
        try {
            if (editingId) {
                // Update existing skill
                await api.skills.update(editingId, data);
                setEditingId(null);
            } else {
                // Add new skill
                await api.skills.save(data);
                setIsAdding(false);
            }

            await fetchSkills(); // Refresh data
            form.reset();
        } catch (error) {
            console.error("Error saving skill:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (skill: Skill) => {
        setEditingId(skill.id);
        form.reset({
            name: skill.name,
            category: skill.category,
            iconUrl: skill.iconUrl || "",
            level: skill.level,
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this skill?")) {
            try {
                await api.skills.delete(id);
                await fetchSkills(); // Refresh data
            } catch (error) {
                console.error("Error deleting skill:", error);
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
                    <h1 className="text-3xl font-bold tracking-tight">Skills & Tech Stack</h1>
                    <p className="text-muted-foreground">
                        Manage your technical skills and technologies
                    </p>
                </div>
                <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                </Button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingId !== null ? "Edit Skill" : "Add New Skill"}</CardTitle>
                        <CardDescription>
                            {editingId !== null ? "Update skill details" : "Add a new skill to your tech stack"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Skill Name</Label>
                                    <Input
                                        id="name"
                                        {...form.register("name")}
                                        placeholder="e.g., React, TypeScript"
                                    />
                                    {form.formState.errors.name && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        {...form.register("category")}
                                        placeholder="e.g., Frontend, Backend, Database"
                                    />
                                    {form.formState.errors.category && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.category.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="iconUrl">Icon Path (optional)</Label>
                                    <Input
                                        id="iconUrl"
                                        {...form.register("iconUrl")}
                                        placeholder="/images/tech-stack-icons/react.svg"
                                    />
                                    {form.formState.errors.iconUrl && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.iconUrl.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="level">Skill Level (1-5)</Label>
                                    <Input
                                        id="level"
                                        type="number"
                                        min="1"
                                        max="5"
                                        {...form.register("level", { valueAsNumber: true })}
                                        placeholder="3"
                                    />
                                    {form.formState.errors.level && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.level.message}
                                        </p>
                                    )}
                                </div>
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

            {/* Skills List */}
            <div className="space-y-4">
                {skills.map((skill) => (
                    <Card key={skill.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {skill.iconUrl && (
                                        <img
                                            src={skill.iconUrl}
                                            alt={`${skill.name} icon`}
                                            className="h-8 w-8 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                                        <CardDescription>{skill.category}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-2 w-2 rounded-full ${level <= skill.level
                                                        ? "bg-primary"
                                                        : "bg-muted"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(skill)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(skill.id)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}

                {skills.length === 0 && !isFetching && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <ExternalLink className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground text-center">
                                No skills added yet. Click "Add Skill" to get started.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 