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
import { Plus, Edit, Trash2, Save, X, Loader2, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";

const projectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string().optional().or(z.literal("")),
    githubUrl: z.string().optional().or(z.literal("")),
    liveUrl: z.string().optional().or(z.literal("")),
    technologies: z.string().min(1, "Technologies are required"),
    featured: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface Project {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    technologies: string[];
    featured: boolean;
    order: number;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            imageUrl: "",
            githubUrl: "",
            liveUrl: "",
            technologies: "",
            featured: false,
        },
    });

    // Fetch projects from API
    const fetchProjects = async () => {
        try {
            setIsFetching(true);
            const data = await api.projects.get();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const onSubmit = async (data: ProjectFormData) => {
        setIsLoading(true);
        try {
            const projectData = {
                ...data,
                technologies: data.technologies.split(",").map(tech => tech.trim()),
            };

            if (editingId) {
                // Update existing project
                await api.projects.update(editingId, projectData);
                setEditingId(null);
            } else {
                // Add new project
                await api.projects.save(projectData);
                setIsAdding(false);
            }

            await fetchProjects(); // Refresh data
            form.reset();
        } catch (error) {
            console.error("Error saving project:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        form.reset({
            title: project.title,
            description: project.description,
            content: project.content,
            imageUrl: project.imageUrl || "",
            githubUrl: project.githubUrl || "",
            liveUrl: project.liveUrl || "",
            technologies: project.technologies.join(", "),
            featured: project.featured,
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            try {
                await api.projects.delete(id);
                await fetchProjects(); // Refresh data
            } catch (error) {
                console.error("Error deleting project:", error);
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
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">
                        Manage your portfolio projects
                    </p>
                </div>
                <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                </Button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingId !== null ? "Edit Project" : "Add New Project"}</CardTitle>
                        <CardDescription>
                            {editingId !== null ? "Update project details" : "Add a new project to your portfolio"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Project Title</Label>
                                    <Input
                                        id="title"
                                        {...form.register("title")}
                                        placeholder="Project Name"
                                    />
                                    {form.formState.errors.title && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="imageUrl">Project Image Path (optional)</Label>
                                    <Input
                                        id="imageUrl"
                                        {...form.register("imageUrl")}
                                        placeholder="/images/projects/project.jpg or https://example.com/image.jpg"
                                    />
                                    {form.formState.errors.imageUrl && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.imageUrl.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                                    <Input
                                        id="githubUrl"
                                        {...form.register("githubUrl")}
                                        placeholder="https://github.com/username/project"
                                    />
                                    {form.formState.errors.githubUrl && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.githubUrl.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="liveUrl">Live URL (optional)</Label>
                                    <Input
                                        id="liveUrl"
                                        {...form.register("liveUrl")}
                                        placeholder="https://project-url.com"
                                    />
                                    {form.formState.errors.liveUrl && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.liveUrl.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Short Description</Label>
                                <Input
                                    id="description"
                                    {...form.register("description")}
                                    placeholder="Brief description of the project"
                                />
                                {form.formState.errors.description && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Detailed Content</Label>
                                <Textarea
                                    id="content"
                                    {...form.register("content")}
                                    placeholder="Detailed description of the project, technologies used, challenges faced, etc."
                                    rows={6}
                                />
                                {form.formState.errors.content && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.content.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                                <Input
                                    id="technologies"
                                    {...form.register("technologies")}
                                    placeholder="React, TypeScript, Node.js, PostgreSQL"
                                />
                                {form.formState.errors.technologies && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.technologies.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    {...form.register("featured")}
                                    className="rounded"
                                />
                                <Label htmlFor="featured">Featured Project</Label>
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

            {/* Projects List */}
            <div className="space-y-4">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {project.imageUrl && (
                                        <img
                                            src={project.imageUrl}
                                            alt={`${project.title} preview`}
                                            className="h-16 w-16 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                        <CardDescription>{project.description}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {project.featured && (
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                                            Featured
                                        </span>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(project)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(project.id)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{project.content}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex space-x-2">
                                {project.githubUrl && (
                                    <Button variant="outline" size="default" asChild>
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            GitHub
                                        </a>
                                    </Button>
                                )}
                                {project.liveUrl && (
                                    <Button variant="outline" size="default" asChild>
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {projects.length === 0 && !isFetching && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <ExternalLink className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground text-center">
                                No projects added yet. Click "Add Project" to get started.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 