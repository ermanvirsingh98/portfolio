"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Download, Printer, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ResumePreview from "@/components/ResumePreview";

interface Resume {
    id: string;
    title: string;
    template: string;
    theme: string;
    fontFamily: string;
    fontSize: string;
    spacing: string;
    sections: any[];
}

export default async function ResumePreviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchResume();
    }, [id]);

    const fetchResume = async () => {
        try {
            const response = await fetch(`/api/resumes/${id}`);
            if (response.ok) {
                const data = await response.json();
                // Parse content for each section
                data.sections = data.sections.map((section: any) => ({
                    ...section,
                    content: typeof section.content === 'string' ? JSON.parse(section.content) : section.content
                }));
                setResume(data);
            } else {
                toast.error("Failed to fetch resume");
                router.push("/dashboard/resumes");
            }
        } catch (error) {
            toast.error("Error loading resume");
            router.push("/dashboard/resumes");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExport = async () => {
        try {
            toast.info("PDF export feature coming soon!");
        } catch (error) {
            toast.error("Error exporting resume");
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Resume not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{resume.title}</h1>
                        <p className="text-muted-foreground">Resume Preview</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={handleExport}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button
                        onClick={() => router.push(`/dashboard/resumes/${resume.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </div>

            {/* Resume Preview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <ResumePreview resume={resume} />
            </div>
        </div>
    );
} 