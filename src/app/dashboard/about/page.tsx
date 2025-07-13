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
import { Save, Loader2 } from "lucide-react";

const aboutSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string().optional(),
});

type AboutFormData = z.infer<typeof aboutSchema>;

export default function AboutPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [existingData, setExistingData] = useState<any>(null);

    const form = useForm<AboutFormData>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            imageUrl: "",
        },
    });

    // Load existing data
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/api/about');
                const data = await response.json();
                if (data.id) {
                    setExistingData(data);
                    form.reset({
                        title: data.title || "",
                        description: data.description || "",
                        content: data.content || "",
                        imageUrl: data.imageUrl || "",
                    });
                }
            } catch (error) {
                console.error('Error loading about data:', error);
            }
        };
        loadData();
    }, [form]);

    const onSubmit = async (data: AboutFormData) => {
        setIsLoading(true);
        try {
            const url = existingData ? '/api/about' : '/api/about';
            const method = existingData ? 'PUT' : 'POST';

            const requestBody = existingData ? { ...data, id: existingData.id } : data;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const savedData = await response.json();
            setExistingData(savedData);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (error) {
            console.error("Error saving:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">About Section</h1>
                <p className="text-muted-foreground">
                    Manage your about section content
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>About Content</CardTitle>
                        <CardDescription>
                            Update your about section information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                {...form.register("title")}
                                placeholder="e.g., About Me"
                            />
                            {form.formState.errors.title && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                {...form.register("description")}
                                placeholder="A brief description of yourself"
                            />
                            {form.formState.errors.description && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <RichTextEditor
                                value={form.watch("content")}
                                onChange={(value) => form.setValue("content", value)}
                                placeholder="Detailed content about yourself, your experience, and what you do..."
                            />
                            {form.formState.errors.content && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.content.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                {...form.register("imageUrl")}
                                placeholder="https://example.com/image.jpg"
                            />
                            {form.formState.errors.imageUrl && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.imageUrl.message}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {isSaved ? "Saved!" : "Save Changes"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
} 