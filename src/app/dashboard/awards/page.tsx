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
import { Plus, Edit, Trash2, Save, X, Loader2, Award } from "lucide-react";
import { api } from "@/lib/api";

const awardSchema = z.object({
    title: z.string().min(1, "Award title is required"),
    issuer: z.string().min(1, "Issuer is required"),
    date: z.string().min(1, "Date is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().optional().or(z.literal("")),
    url: z.string().optional().or(z.literal("")),
});

type AwardFormData = z.infer<typeof awardSchema>;

interface Award {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    imageUrl: string | null;
    url: string | null;
    order: number;
}

export default function AwardsPage() {
    const [awards, setAwards] = useState<Award[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const form = useForm<AwardFormData>({
        resolver: zodResolver(awardSchema),
        defaultValues: {
            title: "",
            issuer: "",
            date: "",
            description: "",
            imageUrl: "",
            url: "",
        },
    });

    // Fetch awards from API
    const fetchAwards = async () => {
        try {
            setIsFetching(true);
            const data = await api.awards.get();
            setAwards(data);
        } catch (error) {
            console.error("Error fetching awards:", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchAwards();
    }, []);

    const onSubmit = async (data: AwardFormData) => {
        setIsLoading(true);
        try {
            if (editingId) {
                // Update existing award
                await api.awards.update(editingId, data);
                setEditingId(null);
            } else {
                // Add new award
                await api.awards.save(data);
                setIsAdding(false);
            }

            await fetchAwards(); // Refresh data
            form.reset();
        } catch (error) {
            console.error("Error saving award:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (award: Award) => {
        setEditingId(award.id);
        form.reset({
            title: award.title,
            issuer: award.issuer,
            date: award.date.split('T')[0], // Convert to YYYY-MM-DD
            description: award.description,
            imageUrl: award.imageUrl || "",
            url: award.url || "",
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this award?")) {
            try {
                await api.awards.delete(id);
                await fetchAwards(); // Refresh data
            } catch (error) {
                console.error("Error deleting award:", error);
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
                    <h1 className="text-3xl font-bold tracking-tight">Awards</h1>
                    <p className="text-muted-foreground">
                        Manage your awards and recognitions
                    </p>
                </div>
                <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Award
                </Button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingId !== null ? "Edit Award" : "Add New Award"}</CardTitle>
                        <CardDescription>
                            {editingId !== null ? "Update award details" : "Add a new award to your portfolio"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Award Title</Label>
                                    <Input
                                        id="title"
                                        {...form.register("title")}
                                        placeholder="e.g., Most Valuable Player Award"
                                    />
                                    {form.formState.errors.title && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="issuer">Issuer</Label>
                                    <Input
                                        id="issuer"
                                        {...form.register("issuer")}
                                        placeholder="e.g., Tech Conference 2023"
                                    />
                                    {form.formState.errors.issuer && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.issuer.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        {...form.register("date")}
                                    />
                                    {form.formState.errors.date && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.date.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="imageUrl">Image Path (optional)</Label>
                                    <Input
                                        id="imageUrl"
                                        {...form.register("imageUrl")}
                                        placeholder="/images/awards/award.jpg"
                                    />
                                    {form.formState.errors.imageUrl && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.imageUrl.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="url">Award URL (optional)</Label>
                                <Input
                                    id="url"
                                    {...form.register("url")}
                                    placeholder="https://example.com/award-details"
                                />
                                {form.formState.errors.url && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.url.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    {...form.register("description")}
                                    placeholder="Describe the award, criteria, and significance..."
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

            {/* Awards List */}
            <div className="space-y-4">
                {awards.map((award) => (
                    <Card key={award.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {award.imageUrl && (
                                        <img
                                            src={award.imageUrl}
                                            alt={`${award.title} image`}
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <CardTitle className="text-lg">{award.title}</CardTitle>
                                        <CardDescription>{award.issuer}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(award.date).toLocaleDateString()}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(award)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(award.id)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{award.description}</p>
                            {award.url && (
                                <a
                                    href={award.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm text-primary hover:underline mt-2"
                                >
                                    View Award Details
                                </a>
                            )}
                        </CardContent>
                    </Card>
                ))}

                {awards.length === 0 && !isFetching && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Award className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground text-center">
                                No awards added yet. Click "Add Award" to get started.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 