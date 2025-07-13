"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, Eye, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
    sections: ResumeSection[];
}

interface ResumeSection {
    id: string;
    type: string;
    title: string;
    content: any;
    order: number;
    isVisible: boolean;
}

export default function ResumeEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [resumeId, setResumeId] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const loadResume = async () => {
            const { id } = await params;
            setResumeId(id);
            await fetchResume(id);
        };
        loadResume();
    }, [params]);

    const fetchResume = async (id: string) => {
        try {
            console.log("Fetching resume with ID:", id);
            const response = await fetch(`/api/resumes/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Raw resume data from API:", data);

                // Parse content for each section
                data.sections = data.sections.map((section: any) => {
                    let parsedContent;
                    try {
                        parsedContent = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
                    } catch (parseError) {
                        console.error("Error parsing section content:", section.content, parseError);
                        parsedContent = section.content;
                    }

                    // Fix date formatting for experience and education sections
                    if (section.type === "experience" && Array.isArray(parsedContent)) {
                        parsedContent = parsedContent.map((exp: any) => ({
                            ...exp,
                            startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : "",
                            endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : "",
                        }));
                    }

                    if (section.type === "education" && Array.isArray(parsedContent)) {
                        parsedContent = parsedContent.map((edu: any) => ({
                            ...edu,
                            startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : "",
                            endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : "",
                        }));
                    }

                    console.log(`Section ${section.type} content:`, parsedContent);

                    return {
                        ...section,
                        content: parsedContent
                    };
                });

                console.log("Processed resume data:", data);
                setResume(data);
            } else {
                console.error("Failed to fetch resume:", response.status, response.statusText);
                toast.error("Failed to fetch resume");
                router.push("/dashboard/resumes");
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
            toast.error("Error loading resume");
            router.push("/dashboard/resumes");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!resume) return;

        setSaving(true);
        try {
            const response = await fetch(`/api/resumes/${resumeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...resume,
                    sections: resume.sections.map(section => ({
                        ...section,
                        content: JSON.stringify(section.content)
                    }))
                }),
            });

            if (response.ok) {
                toast.success("Resume saved successfully!");
            } else {
                toast.error("Failed to save resume");
            }
        } catch (error) {
            toast.error("Error saving resume");
        } finally {
            setSaving(false);
        }
    };

    const handleExport = async () => {
        try {
            // Open resume in a new window for printing
            const printWindow = window.open(`/dashboard/resumes/${resumeId}/print`, '_blank');
            if (printWindow) {
                printWindow.focus();
            } else {
                toast.error("Please allow popups to print the resume");
            }
        } catch (error) {
            toast.error("Error exporting resume");
        }
    };

    const updateSectionContent = (sectionId: string, newContent: any) => {
        if (!resume) return;

        setResume({
            ...resume,
            sections: resume.sections.map(section =>
                section.id === sectionId
                    ? { ...section, content: newContent }
                    : section
            )
        });
    };

    const addExperience = () => {
        if (!resume) return;

        const experienceSection = resume.sections.find(s => s.type === "experience");
        if (experienceSection) {
            const newExperience = {
                company: "",
                position: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                description: "",
            };

            const currentContent = Array.isArray(experienceSection.content) ? experienceSection.content : [];
            updateSectionContent(experienceSection.id, [...currentContent, newExperience]);
        }
    };

    const updateExperience = (index: number, field: string, value: any) => {
        if (!resume) return;

        const experienceSection = resume.sections.find(s => s.type === "experience");
        if (experienceSection && Array.isArray(experienceSection.content)) {
            const updatedExperiences = experienceSection.content.map((exp: any, i: number) =>
                i === index ? { ...exp, [field]: value } : exp
            );
            updateSectionContent(experienceSection.id, updatedExperiences);
        }
    };

    const removeExperience = (index: number) => {
        if (!resume) return;

        const experienceSection = resume.sections.find(s => s.type === "experience");
        if (experienceSection && Array.isArray(experienceSection.content)) {
            const updatedExperiences = experienceSection.content.filter((_: any, i: number) => i !== index);
            updateSectionContent(experienceSection.id, updatedExperiences);
        }
    };

    const addEducation = () => {
        if (!resume) return;

        const educationSection = resume.sections.find(s => s.type === "education");
        if (educationSection) {
            const newEducation = {
                institution: "",
                degree: "",
                field: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                description: "",
            };

            const currentContent = Array.isArray(educationSection.content) ? educationSection.content : [];
            updateSectionContent(educationSection.id, [...currentContent, newEducation]);
        }
    };

    const updateEducation = (index: number, field: string, value: any) => {
        if (!resume) return;

        const educationSection = resume.sections.find(s => s.type === "education");
        if (educationSection && Array.isArray(educationSection.content)) {
            const updatedEducation = educationSection.content.map((edu: any, i: number) =>
                i === index ? { ...edu, [field]: value } : edu
            );
            updateSectionContent(educationSection.id, updatedEducation);
        }
    };

    const removeEducation = (index: number) => {
        if (!resume) return;

        const educationSection = resume.sections.find(s => s.type === "education");
        if (educationSection && Array.isArray(educationSection.content)) {
            const updatedEducation = educationSection.content.filter((_: any, i: number) => i !== index);
            updateSectionContent(educationSection.id, updatedEducation);
        }
    };

    const addSkill = () => {
        if (!resume) return;

        const skillSection = resume.sections.find(s => s.type === "skills");
        if (skillSection) {
            const newSkill = {
                category: "",
                skills: "",
            };

            const currentContent = Array.isArray(skillSection.content) ? skillSection.content : [];
            updateSectionContent(skillSection.id, [...currentContent, newSkill]);
        }
    };

    const updateSkill = (index: number, field: string, value: any) => {
        if (!resume) return;

        const skillSection = resume.sections.find(s => s.type === "skills");
        if (skillSection && Array.isArray(skillSection.content)) {
            const updatedSkills = skillSection.content.map((skill: any, i: number) =>
                i === index ? { ...skill, [field]: value } : skill
            );
            updateSectionContent(skillSection.id, updatedSkills);
        }
    };

    const removeSkill = (index: number) => {
        if (!resume) return;

        const skillSection = resume.sections.find(s => s.type === "skills");
        if (skillSection && Array.isArray(skillSection.content)) {
            const updatedSkills = skillSection.content.filter((_: any, i: number) => i !== index);
            updateSectionContent(skillSection.id, updatedSkills);
        }
    };

    const addProject = () => {
        if (!resume) return;

        const projectSection = resume.sections.find(s => s.type === "projects");
        if (projectSection) {
            const newProject = {
                title: "",
                description: "",
                technologies: [],
                githubUrl: "",
                liveUrl: "",
            };

            const currentContent = Array.isArray(projectSection.content) ? projectSection.content : [];
            updateSectionContent(projectSection.id, [...currentContent, newProject]);
        }
    };

    const updateProject = (index: number, field: string, value: any) => {
        if (!resume) return;

        const projectSection = resume.sections.find(s => s.type === "projects");
        if (projectSection && Array.isArray(projectSection.content)) {
            const updatedProjects = projectSection.content.map((project: any, i: number) =>
                i === index ? { ...project, [field]: value } : project
            );
            updateSectionContent(projectSection.id, updatedProjects);
        }
    };

    const removeProject = (index: number) => {
        if (!resume) return;

        const projectSection = resume.sections.find(s => s.type === "projects");
        if (projectSection && Array.isArray(projectSection.content)) {
            const updatedProjects = projectSection.content.filter((_: any, i: number) => i !== index);
            updateSectionContent(projectSection.id, updatedProjects);
        }
    };

    const renderSectionContent = (section: ResumeSection) => {
        switch (section.type) {
            case "personal":
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                value={section.content.name || ""}
                                onChange={(e) => updateSectionContent(section.id, {
                                    ...section.content,
                                    name: e.target.value
                                })}
                            />
                        </div>
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={section.content.title || ""}
                                onChange={(e) => updateSectionContent(section.id, {
                                    ...section.content,
                                    title: e.target.value
                                })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Email</Label>
                                <Input
                                    value={section.content.email || ""}
                                    onChange={(e) => updateSectionContent(section.id, {
                                        ...section.content,
                                        email: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input
                                    value={section.content.phone || ""}
                                    onChange={(e) => updateSectionContent(section.id, {
                                        ...section.content,
                                        phone: e.target.value
                                    })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Website</Label>
                                <Input
                                    value={section.content.website || ""}
                                    onChange={(e) => updateSectionContent(section.id, {
                                        ...section.content,
                                        website: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <Label>Location</Label>
                                <Input
                                    value={section.content.location || ""}
                                    onChange={(e) => updateSectionContent(section.id, {
                                        ...section.content,
                                        location: e.target.value
                                    })}
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Bio</Label>
                            <Textarea
                                value={section.content.bio || ""}
                                onChange={(e) => updateSectionContent(section.id, {
                                    ...section.content,
                                    bio: e.target.value
                                })}
                                rows={3}
                            />
                        </div>
                    </div>
                );

            case "experience":
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-medium">Work Experience</h4>
                            <Button variant="outline" onClick={addExperience}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Experience
                            </Button>
                        </div>
                        {!Array.isArray(section.content) || section.content.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">No work experience added yet.</p>
                        ) : (
                            section.content.map((exp: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-medium">Experience {index + 1}</h5>
                                        <Button
                                            variant="outline"
                                            onClick={() => removeExperience(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Company</Label>
                                            <Input
                                                value={exp.company || ""}
                                                onChange={(e) => updateExperience(index, "company", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label>Position</Label>
                                            <Input
                                                value={exp.position || ""}
                                                onChange={(e) => updateExperience(index, "position", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Location</Label>
                                            <Input
                                                value={exp.location || ""}
                                                onChange={(e) => updateExperience(index, "location", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label>Start Date</Label>
                                            <Input
                                                type="date"
                                                value={exp.startDate || ""}
                                                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>End Date</Label>
                                            <Input
                                                type="date"
                                                value={exp.endDate || ""}
                                                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                                disabled={exp.isCurrent}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 pt-6">
                                            <input
                                                type="checkbox"
                                                id={`current-${index}`}
                                                checked={exp.isCurrent || false}
                                                onChange={(e) => updateExperience(index, "isCurrent", e.target.checked)}
                                            />
                                            <Label htmlFor={`current-${index}`}>Currently working here</Label>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            value={exp.description || ""}
                                            onChange={(e) => updateExperience(index, "description", e.target.value)}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );

            case "education":
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-medium">Education</h4>
                            <Button variant="outline" onClick={addEducation}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Education
                            </Button>
                        </div>
                        {!Array.isArray(section.content) || section.content.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">No education added yet.</p>
                        ) : (
                            section.content.map((edu: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-medium">Education {index + 1}</h5>
                                        <Button
                                            variant="outline"
                                            onClick={() => removeEducation(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Institution</Label>
                                            <Input
                                                value={edu.institution || ""}
                                                onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label>Degree</Label>
                                            <Input
                                                value={edu.degree || ""}
                                                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Field of Study</Label>
                                            <Input
                                                value={edu.field || ""}
                                                onChange={(e) => updateEducation(index, "field", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label>Location</Label>
                                            <Input
                                                value={edu.location || ""}
                                                onChange={(e) => updateEducation(index, "location", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Start Date</Label>
                                            <Input
                                                type="date"
                                                value={edu.startDate || ""}
                                                onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label>End Date</Label>
                                            <Input
                                                type="date"
                                                value={edu.endDate || ""}
                                                onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                                                disabled={edu.isCurrent}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`edu-current-${index}`}
                                            checked={edu.isCurrent || false}
                                            onChange={(e) => updateEducation(index, "isCurrent", e.target.checked)}
                                        />
                                        <Label htmlFor={`edu-current-${index}`}>Currently studying here</Label>
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            value={edu.description || ""}
                                            onChange={(e) => updateEducation(index, "description", e.target.value)}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );

            case "skills":
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-medium">Skills</h4>
                            <Button variant="outline" onClick={addSkill}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Skill Category
                            </Button>
                        </div>
                        {!Array.isArray(section.content) || section.content.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">No skills added yet.</p>
                        ) : (
                            section.content.map((skill: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-medium">Skill Category {index + 1}</h5>
                                        <Button
                                            variant="outline"
                                            onClick={() => removeSkill(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div>
                                        <Label>Category Name (e.g., Frontend, Backend, Tools)</Label>
                                        <Input
                                            value={skill.category || ""}
                                            onChange={(e) => updateSkill(index, "category", e.target.value)}
                                            placeholder="e.g., Frontend"
                                        />
                                    </div>
                                    <div>
                                        <Label>Skills (comma-separated)</Label>
                                        <Textarea
                                            value={skill.skills || ""}
                                            onChange={(e) => updateSkill(index, "skills", e.target.value)}
                                            placeholder="e.g., React, TypeScript, Next.js, Tailwind CSS"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );

            case "projects":
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-medium">Projects</h4>
                            <Button variant="outline" onClick={addProject}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Project
                            </Button>
                        </div>
                        {!Array.isArray(section.content) || section.content.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">No projects added yet.</p>
                        ) : (
                            section.content.map((project: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-medium">Project {index + 1}</h5>
                                        <Button
                                            variant="outline"
                                            onClick={() => removeProject(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div>
                                        <Label>Project Title</Label>
                                        <Input
                                            value={project.title || ""}
                                            onChange={(e) => updateProject(index, "title", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            value={project.description || ""}
                                            onChange={(e) => updateProject(index, "description", e.target.value)}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>GitHub URL</Label>
                                            <Input
                                                value={project.githubUrl || ""}
                                                onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label>Live Demo URL</Label>
                                            <Input
                                                value={project.liveUrl || ""}
                                                onChange={(e) => updateProject(index, "liveUrl", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Technologies (comma-separated)</Label>
                                        <Input
                                            value={Array.isArray(project.technologies) ? project.technologies.join(", ") : ""}
                                            onChange={(e) => updateProject(index, "technologies", e.target.value.split(", ").filter(t => t.trim()))}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );

            default:
                return <p className="text-muted-foreground">Unknown section type: {section.type}</p>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="outline" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
                </div>
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="outline" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground">Resume not found</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{resume.title}</h1>
                            <p className="text-muted-foreground">Resume Editor</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowPreview(!showPreview)}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            {showPreview ? "Hide Preview" : "Show Preview"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleExport}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Print
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative">
                {/* Editor */}
                <div className="space-y-6">
                    {/* Resume Settings */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <Card>
                            <CardHeader>
                                <CardTitle>Resume Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={resume.title}
                                        onChange={(e) => setResume({ ...resume, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Template</Label>
                                        <select
                                            value={resume.template}
                                            onChange={(e) => setResume({ ...resume, template: e.target.value })}
                                            className="w-full mt-1 p-2 border rounded-md"
                                        >
                                            <option value="modern">Modern</option>
                                            <option value="classic">Classic</option>
                                            <option value="minimal">Minimal</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Theme</Label>
                                        <select
                                            value={resume.theme}
                                            onChange={(e) => setResume({ ...resume, theme: e.target.value })}
                                            className="w-full mt-1 p-2 border rounded-md"
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sections */}
                    {resume.sections.map((section, index) => (
                        <div key={section.id} className="bg-white rounded-lg shadow-sm border">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{section.title}</CardTitle>
                                    {/* Debug info */}
                                    <div className="text-xs text-gray-500 mt-2">
                                        <p>Type: {section.type}</p>
                                        <p>Content type: {typeof section.content}</p>
                                        <p>Is Array: {Array.isArray(section.content) ? 'Yes' : 'No'}</p>
                                        {Array.isArray(section.content) && (
                                            <p>Length: {section.content.length}</p>
                                        )}
                                        <details className="mt-2">
                                            <summary className="cursor-pointer">Raw Content</summary>
                                            <pre className="text-xs bg-gray-100 p-2 mt-1 rounded overflow-auto max-h-32">
                                                {JSON.stringify(section.content, null, 2)}
                                            </pre>
                                        </details>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {renderSectionContent(section)}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Preview Side Panel */}
                {showPreview && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={() => setShowPreview(false)}
                        />

                        {/* Side Panel */}
                        <div className={`fixed top-0 right-0 h-full w-full lg:w-3/5 bg-white shadow-2xl z-50 transform transition-all duration-500 ease-out ${showPreview ? 'translate-x-0' : 'translate-x-full'
                            }`}>
                            <div className="flex flex-col h-full">
                                {/* Preview Header */}
                                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                                    <h3 className="text-lg font-semibold">Resume Preview</h3>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowPreview(false)}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Preview Content */}
                                <div className="flex-1 overflow-auto p-4">
                                    <div className="max-w-full">
                                        <ResumePreview resume={resume} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 