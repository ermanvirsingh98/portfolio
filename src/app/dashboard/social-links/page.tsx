"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SOCIAL_LINKS } from "@/data/user";
import { Plus, Edit, Trash2, Save, X, Loader2, ExternalLink } from "lucide-react";

const socialLinkSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    href: z.string().url("Invalid URL"),
    icon: z.string().min(1, "Icon is required"),
});

type SocialLinkFormData = z.infer<typeof socialLinkSchema>;

interface SocialLink {
    icon: string;
    title: string;
    description: string;
    href: string;
}

const availableIcons = [
    { value: "github", label: "GitHub", path: "/images/link-icons/github.webp" },
    { value: "linkedin", label: "LinkedIn", path: "/images/link-icons/linkedin.webp" },
    { value: "twitter", label: "Twitter", path: "/images/link-icons/twitter.webp" },
    { value: "youtube", label: "YouTube", path: "/images/link-icons/youtube.webp" },
    { value: "telegram", label: "Telegram", path: "/images/link-icons/telegram.webp" },
    { value: "zalo", label: "Zalo", path: "/images/link-icons/zalo.webp" },
    { value: "dailydev", label: "daily.dev", path: "/images/link-icons/dailydev.webp" },
];

export default function SocialLinksPage() {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>(SOCIAL_LINKS);
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SocialLinkFormData>({
        resolver: zodResolver(socialLinkSchema),
        defaultValues: {
            title: "",
            description: "",
            href: "",
            icon: "",
        },
    });

    const onSubmit = async (data: SocialLinkFormData) => {
        setIsLoading(true);
        try {
            const selectedIcon = availableIcons.find(icon => icon.value === data.icon);
            const socialLinkData: SocialLink = {
                ...data,
                icon: selectedIcon?.path || data.icon,
            };

            if (editingIndex !== null) {
                // Update existing social link
                setSocialLinks(prev =>
                    prev.map((link, index) =>
                        index === editingIndex ? socialLinkData : link
                    )
                );
                setEditingIndex(null);
            } else {
                // Add new social link
                setSocialLinks(prev => [...prev, socialLinkData]);
                setIsAdding(false);
            }

            // Update the SOCIAL_LINKS array (in a real app, this would be saved to a database)
            if (editingIndex !== null) {
                SOCIAL_LINKS[editingIndex] = socialLinkData;
            } else {
                SOCIAL_LINKS.push(socialLinkData);
            }

            form.reset();
        } catch (error) {
            console.error("Error saving social link:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (socialLink: SocialLink, index: number) => {
        setEditingIndex(index);
        const iconValue = availableIcons.find(icon => icon.path === socialLink.icon)?.value || socialLink.icon;
        form.reset({
            title: socialLink.title,
            description: socialLink.description,
            href: socialLink.href,
            icon: iconValue,
        });
    };

    const handleDelete = (index: number) => {
        setSocialLinks(prev => prev.filter((_, i) => i !== index));
        // Update the SOCIAL_LINKS array
        SOCIAL_LINKS.splice(index, 1);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingIndex(null);
        form.reset();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Social Links</h1>
                    <p className="text-muted-foreground">
                        Manage your social media and contact links
                    </p>
                </div>
                <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingIndex !== null}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Social Link
                </Button>
            </div>

            {/* Add/Edit Form */}
            {(isAdding || editingIndex !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingIndex !== null ? "Edit Social Link" : "Add New Social Link"}</CardTitle>
                        <CardDescription>
                            {editingIndex !== null ? "Update social link details" : "Add a new social link to your portfolio"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Platform Name</Label>
                                    <Input
                                        id="title"
                                        {...form.register("title")}
                                        placeholder="e.g., GitHub, LinkedIn"
                                    />
                                    {form.formState.errors.title && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Username/Handle</Label>
                                    <Input
                                        id="description"
                                        {...form.register("description")}
                                        placeholder="e.g., yourusername"
                                    />
                                    {form.formState.errors.description && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.description.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="href">Profile URL</Label>
                                    <Input
                                        id="href"
                                        {...form.register("href")}
                                        placeholder="https://github.com/yourusername"
                                    />
                                    {form.formState.errors.href && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.href.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Select
                                        value={form.watch("icon")}
                                        onValueChange={(value) => form.setValue("icon", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableIcons.map((icon) => (
                                                <SelectItem key={icon.value} value={icon.value}>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={icon.path}
                                                            alt={icon.label}
                                                            className="w-4 h-4"
                                                        />
                                                        {icon.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.icon && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.icon.message}
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
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {editingIndex !== null ? "Update" : "Add"} Social Link
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Social Links List */}
            <div className="grid gap-4">
                {socialLinks.map((socialLink, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4 flex-1">
                                    <img
                                        src={socialLink.icon}
                                        alt={socialLink.title}
                                        className="w-8 h-8 rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{socialLink.title}</h3>
                                        <p className="text-muted-foreground">{socialLink.description}</p>
                                        <a
                                            href={socialLink.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm text-primary hover:underline mt-1"
                                        >
                                            <ExternalLink className="mr-1 h-3 w-3" />
                                            View Profile
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(socialLink, index)}
                                        disabled={isAdding || editingIndex !== null}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(index)}
                                        disabled={isAdding || editingIndex !== null}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {socialLinks.length === 0 && (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No social links yet. Add your first social link!</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 