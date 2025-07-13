"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Eye, Printer } from "lucide-react";

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

export default function ResumePrintPage({ params }: { params: Promise<{ id: string }> }) {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadResume = async () => {
            const { id } = await params;
            await fetchResume(id);
        };
        loadResume();
    }, [params]);

    const fetchResume = async (id: string) => {
        try {
            const response = await fetch(`/api/resumes/${id}`);
            if (response.ok) {
                const data = await response.json();

                // Parse content for each section
                data.sections = data.sections.map((section: any) => {
                    let parsedContent;
                    try {
                        parsedContent = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
                    } catch (parseError) {
                        console.error("Error parsing section content:", section.content, parseError);
                        parsedContent = section.content;
                    }

                    return {
                        ...section,
                        content: parsedContent
                    };
                });

                setResume(data);
            } else {
                console.error("Failed to fetch resume");
            }
        } catch (error) {
            console.error("Error loading resume:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        // Auto-print when component mounts
        if (resume && !loading) {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [resume, loading]);

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
                        <p className="text-muted-foreground">Print Resume</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => router.push(`/dashboard/resumes/${resume.id}/preview`)}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                    <Button
                        onClick={handlePrint}
                    >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                </div>
            </div>

            {/* Print Instructions */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <h3 className="font-medium text-blue-900 mb-1">Print Instructions</h3>
                            <p className="text-sm text-blue-700">
                                Click the "Print" button above to open the print dialog. For best results, select "Save as PDF" or use your browser's print-to-PDF feature.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Resume for Print */}
            <div className="bg-white rounded-lg shadow-sm border p-6 print:p-0 print:shadow-none print:border-none">
                <ResumePreview resume={resume} />
            </div>
        </div>
    );
} 