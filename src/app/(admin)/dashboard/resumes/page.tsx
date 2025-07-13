"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Eye, Download, Trash2, FileText, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Resume {
    id: string;
    title: string;
    template: string;
    theme: string;
    createdAt: string;
    updatedAt: string;
    sections: any[];
}

export default function ResumesPage() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await fetch("/api/resumes");
            if (response.ok) {
                const data = await response.json();
                setResumes(data);
            } else {
                toast.error("Failed to fetch resumes");
            }
        } catch (error) {
            toast.error("Error loading resumes");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resume?")) return;

        setDeletingId(id);
        try {
            const response = await fetch(`/api/resumes/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Resume deleted successfully");
                setResumes(resumes.filter(resume => resume.id !== id));
            } else {
                toast.error("Failed to delete resume");
            }
        } catch (error) {
            toast.error("Error deleting resume");
        } finally {
            setDeletingId(null);
        }
    };

    const handleExport = async (id: string) => {
        try {
            // For now, just show a toast - PDF export will be implemented later
            toast.info("PDF export feature coming soon!");
        } catch (error) {
            toast.error("Error exporting resume");
        }
    };

    const getTemplateColor = (template: string) => {
        switch (template) {
            case "modern":
                return "bg-blue-100 text-blue-800";
            case "classic":
                return "bg-green-100 text-green-800";
            case "minimal":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTemplateIcon = (template: string) => {
        switch (template) {
            case "modern":
                return "🎨";
            case "classic":
                return "📄";
            case "minimal":
                return "⚡";
            default:
                return "📄";
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
                    <p className="text-muted-foreground">
                        Create and manage your professional resumes
                    </p>
                </div>
                <Button onClick={() => router.push("/dashboard/resumes/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Resume
                </Button>
            </div>

            {/* Resume List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                    <Card key={resume.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="truncate">{resume.title}</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/resumes/${resume.id}`)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/resumes/${resume.id}/preview`)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Preview
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/resumes/${resume.id}/print`)}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Print
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => handleDelete(resume.id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardTitle>
                            <CardDescription>
                                {resume.sections.length} sections • {resume.template} template
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Created {formatDate(resume.createdAt)}</span>
                                <span className="capitalize">{resume.theme}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => router.push(`/dashboard/resumes/${resume.id}`)}
                                className="w-full"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Resume
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {resumes.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Create your first professional resume to get started
                        </p>
                        <Button onClick={() => router.push("/dashboard/resumes/new")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Your First Resume
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}; 