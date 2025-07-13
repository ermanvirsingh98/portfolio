"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, FileText, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PortfolioData {
    overview?: any;
    experiences?: any[];
    education?: any[];
    skills?: any[];
    projects?: any[];
}

export default function NewResumePage() {
    const [title, setTitle] = useState("");
    const [template, setTemplate] = useState("modern");
    const [theme, setTheme] = useState("light");
    const [portfolioData, setPortfolioData] = useState<PortfolioData>({});
    const [selectedData, setSelectedData] = useState({
        overview: true,
        experiences: true,
        education: true,
        skills: true,
        projects: true,
    });
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPortfolioData();
    }, []);

    const fetchPortfolioData = async () => {
        try {
            const [overviewRes, experiencesRes, educationRes, skillsRes, projectsRes] = await Promise.all([
                fetch("/api/overview"),
                fetch("/api/experiences"),
                fetch("/api/education"),
                fetch("/api/skills"),
                fetch("/api/projects"),
            ]);

            const data: PortfolioData = {};

            if (overviewRes.ok) {
                const overview = await overviewRes.json();
                data.overview = overview;
            }

            if (experiencesRes.ok) {
                const experiences = await experiencesRes.json();
                data.experiences = experiences;
            }

            if (educationRes.ok) {
                const education = await educationRes.json();
                data.education = education;
            }

            if (skillsRes.ok) {
                const skills = await skillsRes.json();
                data.skills = skills;
            }

            if (projectsRes.ok) {
                const projects = await projectsRes.json();
                data.projects = projects;
            }

            setPortfolioData(data);
        } catch (error) {
            toast.error("Failed to load portfolio data");
        } finally {
            setDataLoading(false);
        }
    };

    const handleCreateResume = async () => {
        if (!title.trim()) {
            toast.error("Please enter a resume title");
            return;
        }

        setLoading(true);
        try {
            // Prepare sections based on selected data
            const sections = [];
            let order = 0;

            // Personal Information
            if (selectedData.overview && portfolioData.overview) {
                sections.push({
                    type: "personal",
                    title: "Personal Information",
                    content: {
                        name: `${portfolioData.overview.firstName} ${portfolioData.overview.lastName}`,
                        title: portfolioData.overview.jobTitle || "",
                        email: portfolioData.overview.email || "",
                        phone: portfolioData.overview.phoneNumber || "",
                        website: portfolioData.overview.website || "",
                        location: portfolioData.overview.address || "",
                        bio: portfolioData.overview.bio || "",
                    },
                    order: order++,
                    isVisible: true,
                });
            }

            // Experience
            if (selectedData.experiences && portfolioData.experiences && portfolioData.experiences.length > 0) {
                sections.push({
                    type: "experience",
                    title: "Work Experience",
                    content: portfolioData.experiences.map((exp: any) => ({
                        company: exp.company,
                        position: exp.position,
                        location: exp.location,
                        startDate: exp.startDate,
                        endDate: exp.endDate,
                        isCurrent: exp.isCurrent,
                        description: exp.description,
                    })),
                    order: order++,
                    isVisible: true,
                });
            }

            // Education
            if (selectedData.education && portfolioData.education && portfolioData.education.length > 0) {
                sections.push({
                    type: "education",
                    title: "Education",
                    content: portfolioData.education.map((edu: any) => ({
                        institution: edu.institution,
                        degree: edu.degree,
                        field: edu.field,
                        location: edu.location,
                        startDate: edu.startDate,
                        endDate: edu.endDate,
                        isCurrent: edu.isCurrent,
                        description: edu.description,
                    })),
                    order: order++,
                    isVisible: true,
                });
            }

            // Skills
            if (selectedData.skills && portfolioData.skills && portfolioData.skills.length > 0) {
                console.log("Raw skills data:", portfolioData.skills);

                // Group skills by category
                const skillsByCategory = portfolioData.skills.reduce((acc: any, skill: any) => {
                    if (!acc[skill.category]) {
                        acc[skill.category] = [];
                    }
                    acc[skill.category].push(skill.name);
                    return acc;
                }, {});

                console.log("Skills grouped by category:", skillsByCategory);

                // Convert to the expected format
                const skillsContent = Object.entries(skillsByCategory).map(([category, skills]) => ({
                    category,
                    skills: (skills as string[]).join(', ')
                }));

                console.log("Final skills content:", skillsContent);

                sections.push({
                    type: "skills",
                    title: "Skills",
                    content: skillsContent,
                    order: order++,
                    isVisible: true,
                });
            }

            // Projects
            if (selectedData.projects && portfolioData.projects && portfolioData.projects.length > 0) {
                sections.push({
                    type: "projects",
                    title: "Projects",
                    content: portfolioData.projects.map((project: any) => ({
                        title: project.title,
                        description: project.description,
                        technologies: project.technologies,
                        githubUrl: project.githubUrl,
                        liveUrl: project.liveUrl,
                    })),
                    order: order++,
                    isVisible: true,
                });
            }

            const requestBody = {
                title,
                template,
                theme,
                fontFamily: "inter",
                fontSize: "medium",
                spacing: "normal",
                sections,
            };

            console.log("Creating resume with data:", JSON.stringify(requestBody, null, 2));

            const response = await fetch("/api/resumes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const resume = await response.json();
                console.log("Created resume:", resume);
                toast.success("Resume created successfully!");
                router.push(`/dashboard/resumes/${resume.id}`);
            } else {
                const errorData = await response.json();
                console.error("Failed to create resume:", errorData);
                toast.error("Failed to create resume");
            }
        } catch (error) {
            toast.error("Error creating resume");
        } finally {
            setLoading(false);
        }
    };

    const handleStartFromScratch = () => {
        router.push("/dashboard/resumes/new/multi-step");
    };

    if (dataLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create New Resume</h1>
                    <p className="text-muted-foreground">
                        Choose how you want to create your resume
                    </p>
                </div>
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
                {/* Import from Portfolio */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Download className="h-5 w-5" />
                            Import from Portfolio
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Resume Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Software Engineer Resume"
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Template</Label>
                                <select
                                    value={template}
                                    onChange={(e) => setTemplate(e.target.value)}
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
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-md"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <Label className="text-base font-medium">Select Data to Import</Label>
                            <div className="space-y-3 mt-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="overview"
                                        checked={selectedData.overview}
                                        onChange={(e) =>
                                            setSelectedData({ ...selectedData, overview: e.target.checked })
                                        }
                                    />
                                    <Label htmlFor="overview">Personal Information</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="experiences"
                                        checked={selectedData.experiences}
                                        onChange={(e) =>
                                            setSelectedData({ ...selectedData, experiences: e.target.checked })
                                        }
                                    />
                                    <Label htmlFor="experiences">Work Experience</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="education"
                                        checked={selectedData.education}
                                        onChange={(e) =>
                                            setSelectedData({ ...selectedData, education: e.target.checked })
                                        }
                                    />
                                    <Label htmlFor="education">Education</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="skills"
                                        checked={selectedData.skills}
                                        onChange={(e) =>
                                            setSelectedData({ ...selectedData, skills: e.target.checked })
                                        }
                                    />
                                    <Label htmlFor="skills">Skills</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="projects"
                                        checked={selectedData.projects}
                                        onChange={(e) =>
                                            setSelectedData({ ...selectedData, projects: e.target.checked })
                                        }
                                    />
                                    <Label htmlFor="projects">Projects</Label>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleCreateResume}
                            disabled={loading || !title.trim()}
                            className="w-full"
                        >
                            {loading ? "Creating..." : "Create Resume from Portfolio"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Start from Scratch */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Start from Scratch
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            Create a completely new resume with a blank template. You can add all content manually.
                        </p>

                        <div className="space-y-2">
                            <h4 className="font-medium">Features:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Blank template to start fresh</li>
                                <li>• Manual content entry</li>
                                <li>• Full customization options</li>
                                <li>• Real-time preview</li>
                            </ul>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleStartFromScratch}
                            className="w-full"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Start from Scratch
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 