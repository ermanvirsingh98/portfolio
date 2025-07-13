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

const certificationSchema = z.object({
    title: z.string().min(1, "Certification title is required"),
    issuer: z.string().min(1, "Issuer is required"),
    issueDate: z.string().min(1, "Issue date is required"),
    expiryDate: z.string().optional(),
    credentialId: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().optional().or(z.literal("")),
    url: z.string().optional().or(z.literal("")),
});

type CertificationFormData = z.infer<typeof certificationSchema>;

interface Certification {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate: string | null;
    credentialId: string | null;
    description: string;
    imageUrl: string | null;
    url: string | null;
    order: number;
}

export default function CertificationsPage() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const form = useForm<CertificationFormData>({
        resolver: zodResolver(certificationSchema),
        defaultValues: {
            title: "",
            issuer: "",
            issueDate: "",
            expiryDate: "",
            credentialId: "",
            description: "",
            imageUrl: "",
            url: "",
        },
    });

    // Fetch certifications from API
    const fetchCertifications = async () => {
        try {
            setIsFetching(true);
            const data = await api.certifications.get();
            setCertifications(data);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    const onSubmit = async (data: CertificationFormData) => {
        setIsLoading(true);
        try {
            if (editingId) {
                // Update existing certification
                await api.certifications.update(editingId, data);
                setEditingId(null);
            } else {
                // Add new certification
                await api.certifications.save(data);
                setIsAdding(false);
            }

            await fetchCertifications(); // Refresh data
            form.reset();
        } catch (error) {
            console.error("Error saving certification:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (certification: Certification) => {
        setEditingId(certification.id);
        form.reset({
            title: certification.title,
            issuer: certification.issuer,
            issueDate: certification.issueDate.split('T')[0], // Convert to YYYY-MM-DD
            expiryDate: certification.expiryDate ? certification.expiryDate.split('T')[0] : "",
            credentialId: certification.credentialId || "",
            description: certification.description,
            imageUrl: certification.imageUrl || "",
            url: certification.url || "",
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this certification?")) {
            try {
                await api.certifications.delete(id);
                await fetchCertifications(); // Refresh data
            } catch (error) {
                console.error("Error deleting certification:", error);
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
                    <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
                    <p className="text-muted-foreground">
                        Manage your professional certifications
                    </p>
                </div>
                <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                </Button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingId !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingId !== null ? "Edit Certification" : "Add New Certification"}</CardTitle>
                        <CardDescription>
                            {editingId !== null ? "Update certification details" : "Add a new certification to your portfolio"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Certification Title</Label>
                                    <Input
                                        id="title"
                                        {...form.register("title")}
                                        placeholder="e.g., AWS Certified Developer"
                                    />
                                    {form.formState.errors.title && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="issuer">Issuing Organization</Label>
                                    <Input
                                        id="issuer"
                                        {...form.register("issuer")}
                                        placeholder="e.g., Amazon Web Services"
                                    />
                                    {form.formState.errors.issuer && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.issuer.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="issueDate">Issue Date</Label>
                                    <Input
                                        id="issueDate"
                                        type="date"
                                        {...form.register("issueDate")}
                                    />
                                    {form.formState.errors.issueDate && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.issueDate.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="expiryDate">Expiry Date (optional)</Label>
                                    <Input
                                        id="expiryDate"
                                        type="date"
                                        {...form.register("expiryDate")}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="credentialId">Credential ID (optional)</Label>
                                    <Input
                                        id="credentialId"
                                        {...form.register("credentialId")}
                                        placeholder="e.g., AWS-DEV-123456"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="imageUrl">Image Path (optional)</Label>
                                    <Input
                                        id="imageUrl"
                                        {...form.register("imageUrl")}
                                        placeholder="/images/certifications/cert.jpg"
                                    />
                                    {form.formState.errors.imageUrl && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.imageUrl.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="url">Verification URL (optional)</Label>
                                <Input
                                    id="url"
                                    {...form.register("url")}
                                    placeholder="https://example.com/verify-certification"
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
                                    placeholder="Describe the certification, skills covered, and significance..."
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

            {/* Certifications List */}
            <div className="space-y-4">
                {certifications.map((certification) => (
                    <Card key={certification.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {certification.imageUrl && (
                                        <img
                                            src={certification.imageUrl}
                                            alt={`${certification.title} image`}
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <CardTitle className="text-lg">{certification.title}</CardTitle>
                                        <CardDescription>{certification.issuer}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(certification.issueDate).toLocaleDateString()}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(certification)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(certification.id)}
                                        disabled={isAdding || editingId !== null}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{certification.description}</p>
                                {certification.credentialId && (
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Credential ID:</strong> {certification.credentialId}
                                    </p>
                                )}
                                {certification.expiryDate && (
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Expires:</strong> {new Date(certification.expiryDate).toLocaleDateString()}
                                    </p>
                                )}
                                {certification.url && (
                                    <a
                                        href={certification.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-primary hover:underline mt-2"
                                    >
                                        Verify Certification
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {certifications.length === 0 && !isFetching && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Award className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground text-center">
                                No certifications added yet. Click "Add Certification" to get started.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 