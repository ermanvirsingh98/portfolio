"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, User, Briefcase, GraduationCap, Code, Award, FileText, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface ResumeData {
    title: string;
    template: string;
    theme: string;
    fontFamily: string;
    fontSize: string;
    spacing: string;
    personal: {
        name: string;
        title: string;
        email: string;
        phone: string;
        website: string;
        location: string;
        bio: string;
    };
    experiences: Array<{
        company: string;
        position: string;
        location: string;
        startDate: string;
        endDate: string;
        isCurrent: boolean;
        description: string;
    }>;
    education: Array<{
        institution: string;
        degree: string;
        field: string;
        location: string;
        startDate: string;
        endDate: string;
        isCurrent: boolean;
        description: string;
    }>;
    skills: Array<{
        category: string;
        skills: string;
    }>;
    projects: Array<{
        title: string;
        description: string;
        technologies: string[];
        githubUrl: string;
        liveUrl: string;
    }>;
}

const steps = [
    { id: 1, title: "Basic Info", icon: FileText },
    { id: 2, title: "Personal Info", icon: User },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Education", icon: GraduationCap },
    { id: 5, title: "Skills", icon: Code },
    { id: 6, title: "Projects", icon: Award },
    { id: 7, title: "Review", icon: Check },
];

export default function MultiStepResumePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [portfolioData, setPortfolioData] = useState<PortfolioData>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const router = useRouter();

    const [resumeData, setResumeData] = useState<ResumeData>({
        title: "",
        template: "modern",
        theme: "light",
        fontFamily: "inter",
        fontSize: "medium",
        spacing: "normal",
        personal: {
            name: "",
            title: "",
            email: "",
            phone: "",
            website: "",
            location: "",
            bio: "",
        },
        experiences: [],
        education: [],
        skills: [],
        projects: [],
    });

    useEffect(() => {
        fetchPortfolioData();
    }, []);

    const fetchPortfolioData = async () => {
        try {
            setLoading(true);
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
            setDataLoaded(true);
        } catch (error) {
            toast.error("Error loading portfolio data");
        } finally {
            setLoading(false);
        }
    };

    const pullDefaultData = () => {
        if (!dataLoaded) {
            toast.error("Portfolio data not loaded yet");
            return;
        }

        // Set default personal info
        if (portfolioData.overview) {
            setResumeData(prev => ({
                ...prev,
                personal: {
                    name: `${portfolioData.overview.firstName || ""} ${portfolioData.overview.lastName || ""}`.trim(),
                    title: portfolioData.overview.jobTitle || "",
                    email: portfolioData.overview.email || "",
                    phone: portfolioData.overview.phoneNumber || "",
                    website: portfolioData.overview.website || "",
                    location: portfolioData.overview.address || "",
                    bio: portfolioData.overview.bio || "",
                }
            }));
        }

        // Set experiences
        if (portfolioData.experiences && portfolioData.experiences.length > 0) {
            setResumeData(prev => ({
                ...prev,
                experiences: (portfolioData.experiences ?? []).map((exp: any) => ({
                    company: exp.company,
                    position: exp.position,
                    location: exp.location || "",
                    startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : "",
                    endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : "",
                    isCurrent: exp.isCurrent,
                    description: exp.description,
                }))
            }));
        }

        // Set education
        if (portfolioData.education && portfolioData.education.length > 0) {
            setResumeData(prev => ({
                ...prev,
                education: (portfolioData.education ?? []).map((edu: any) => ({
                    institution: edu.institution,
                    degree: edu.degree,
                    field: edu.field,
                    location: edu.location || "",
                    startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : "",
                    endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : "",
                    isCurrent: edu.isCurrent,
                    description: edu.description,
                }))
            }));
        }

        // Set skills
        if (portfolioData.skills && portfolioData.skills.length > 0) {
            console.log("Raw skills data in multi-step:", portfolioData.skills);

            // Group skills by category
            const skillsByCategory = portfolioData.skills.reduce((acc: any, skill: any) => {
                if (!acc[skill.category]) {
                    acc[skill.category] = [];
                }
                acc[skill.category].push(skill.name);
                return acc;
            }, {});

            console.log("Skills grouped by category in multi-step:", skillsByCategory);

            // Convert to the expected format
            const skillsContent = Object.entries(skillsByCategory).map(([category, skills]) => ({
                category,
                skills: (skills as string[]).join(', ')
            }));

            console.log("Final skills content in multi-step:", skillsContent);

            setResumeData(prev => ({
                ...prev,
                skills: skillsContent
            }));
        }

        // Set projects
        if (portfolioData.projects && portfolioData.projects.length > 0) {
            setResumeData(prev => ({
                ...prev,
                projects: (portfolioData.projects ?? []).map((project: any) => ({
                    title: project.title,
                    description: project.description,
                    technologies: project.technologies || [],
                    githubUrl: project.githubUrl || "",
                    liveUrl: project.liveUrl || "",
                }))
            }));
        }

        toast.success("Portfolio data loaded successfully!");
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateResumeData = (field: string, value: any) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

    const updatePersonalData = (field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experiences: [...prev.experiences, {
                company: "",
                position: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                description: "",
            }]
        }));
    };

    const updateExperience = (index: number, field: string, value: any) => {
        setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const removeExperience = (index: number) => {
        setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, {
                institution: "",
                degree: "",
                field: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                description: "",
            }]
        }));
    };

    const updateEducation = (index: number, field: string, value: any) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const removeEducation = (index: number) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const addSkill = () => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, {
                category: "Technical",
                skills: "",
            }]
        }));
    };

    const updateSkill = (index: number, field: string, value: any) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map((skill, i) =>
                i === index ? { ...skill, [field]: value } : skill
            )
        }));
    };

    const removeSkill = (index: number) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                title: "",
                description: "",
                technologies: [],
                githubUrl: "",
                liveUrl: "",
            }]
        }));
    };

    const updateProject = (index: number, field: string, value: any) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map((project, i) =>
                i === index ? { ...project, [field]: value } : project
            )
        }));
    };

    const removeProject = (index: number) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    const handleCreateResume = async () => {
        if (!resumeData.title.trim()) {
            toast.error("Please enter a resume title");
            return;
        }

        setSaving(true);
        try {
            const sections = [
                {
                    type: "personal",
                    title: "Personal Information",
                    content: resumeData.personal,
                    order: 0,
                    isVisible: true,
                },
                {
                    type: "experience",
                    title: "Work Experience",
                    content: resumeData.experiences,
                    order: 1,
                    isVisible: true,
                },
                {
                    type: "education",
                    title: "Education",
                    content: resumeData.education,
                    order: 2,
                    isVisible: true,
                },
                {
                    type: "skills",
                    title: "Skills",
                    content: resumeData.skills,
                    order: 3,
                    isVisible: true,
                },
                {
                    type: "projects",
                    title: "Projects",
                    content: resumeData.projects,
                    order: 4,
                    isVisible: true,
                },
            ];

            const requestBody = {
                title: resumeData.title,
                template: resumeData.template,
                theme: resumeData.theme,
                fontFamily: resumeData.fontFamily,
                fontSize: resumeData.fontSize,
                spacing: resumeData.spacing,
                sections,
            };

            console.log("Creating resume with data:", requestBody);

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
            console.error("Error creating resume:", error);
            toast.error("Error creating resume");
        } finally {
            setSaving(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Basic Information
                                <Button
                                    variant="outline"
                                    onClick={pullDefaultData}
                                    disabled={!dataLoaded}
                                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                >
                                    <Database className="mr-2 h-4 w-4" />
                                    Pull Default Data
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Resume Title</Label>
                                <Input
                                    id="title"
                                    value={resumeData.title}
                                    onChange={(e) => updateResumeData("title", e.target.value)}
                                    placeholder="e.g., Software Engineer Resume"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Template</Label>
                                    <select
                                        value={resumeData.template}
                                        onChange={(e) => updateResumeData("template", e.target.value)}
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
                                        value={resumeData.theme}
                                        onChange={(e) => updateResumeData("theme", e.target.value)}
                                        className="w-full mt-1 p-2 border rounded-md"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );

            case 2:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Full Name</Label>
                                    <Input
                                        value={resumeData.personal.name}
                                        onChange={(e) => updatePersonalData("name", e.target.value)}
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <Label>Job Title</Label>
                                    <Input
                                        value={resumeData.personal.title}
                                        onChange={(e) => updatePersonalData("title", e.target.value)}
                                        placeholder="e.g., Software Engineer"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={resumeData.personal.email}
                                        onChange={(e) => updatePersonalData("email", e.target.value)}
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input
                                        value={resumeData.personal.phone}
                                        onChange={(e) => updatePersonalData("phone", e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Website</Label>
                                    <Input
                                        value={resumeData.personal.website}
                                        onChange={(e) => updatePersonalData("website", e.target.value)}
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                                <div>
                                    <Label>Location</Label>
                                    <Input
                                        value={resumeData.personal.location}
                                        onChange={(e) => updatePersonalData("location", e.target.value)}
                                        placeholder="City, State"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Bio</Label>
                                <Textarea
                                    value={resumeData.personal.bio}
                                    onChange={(e) => updatePersonalData("bio", e.target.value)}
                                    placeholder="A brief description about yourself"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>
                );

            case 3:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Work Experience
                                <Button variant="outline" onClick={addExperience}>
                                    Add Experience
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resumeData.experiences.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No work experience added yet.</p>
                                    <p className="text-sm">Click "Add Experience" to get started.</p>
                                </div>
                            ) : (
                                resumeData.experiences.map((exp, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">Experience {index + 1}</h4>
                                            <Button
                                                variant="outline"
                                                onClick={() => removeExperience(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Company</Label>
                                                <Input
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                                                    placeholder="Company name"
                                                />
                                            </div>
                                            <div>
                                                <Label>Position</Label>
                                                <Input
                                                    value={exp.position}
                                                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                                                    placeholder="Job title"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Location</Label>
                                                <Input
                                                    value={exp.location}
                                                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                                                    placeholder="City, State"
                                                />
                                            </div>
                                            <div>
                                                <Label>Start Date</Label>
                                                <Input
                                                    type="date"
                                                    value={exp.startDate}
                                                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>End Date</Label>
                                                <Input
                                                    type="date"
                                                    value={exp.endDate}
                                                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                                    disabled={exp.isCurrent}
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2 pt-6">
                                                <input
                                                    type="checkbox"
                                                    id={`current-${index}`}
                                                    checked={exp.isCurrent}
                                                    onChange={(e) => updateExperience(index, "isCurrent", e.target.checked)}
                                                />
                                                <Label htmlFor={`current-${index}`}>Currently working here</Label>
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea
                                                value={exp.description}
                                                onChange={(e) => updateExperience(index, "description", e.target.value)}
                                                placeholder="Describe your role and achievements"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                );

            case 4:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Education
                                <Button variant="outline" onClick={addEducation}>
                                    Add Education
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resumeData.education.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No education added yet.</p>
                                    <p className="text-sm">Click "Add Education" to get started.</p>
                                </div>
                            ) : (
                                resumeData.education.map((edu, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">Education {index + 1}</h4>
                                            <Button
                                                variant="outline"
                                                onClick={() => removeEducation(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Institution</Label>
                                                <Input
                                                    value={edu.institution}
                                                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                                    placeholder="University name"
                                                />
                                            </div>
                                            <div>
                                                <Label>Degree</Label>
                                                <Input
                                                    value={edu.degree}
                                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                                    placeholder="e.g., Bachelor's"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Field of Study</Label>
                                                <Input
                                                    value={edu.field}
                                                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                                                    placeholder="e.g., Computer Science"
                                                />
                                            </div>
                                            <div>
                                                <Label>Location</Label>
                                                <Input
                                                    value={edu.location}
                                                    onChange={(e) => updateEducation(index, "location", e.target.value)}
                                                    placeholder="City, State"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Start Date</Label>
                                                <Input
                                                    type="date"
                                                    value={edu.startDate}
                                                    onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>End Date</Label>
                                                <Input
                                                    type="date"
                                                    value={edu.endDate}
                                                    onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                                                    disabled={edu.isCurrent}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`edu-current-${index}`}
                                                checked={edu.isCurrent}
                                                onChange={(e) => updateEducation(index, "isCurrent", e.target.checked)}
                                            />
                                            <Label htmlFor={`edu-current-${index}`}>Currently studying here</Label>
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea
                                                value={edu.description}
                                                onChange={(e) => updateEducation(index, "description", e.target.value)}
                                                placeholder="Describe your studies and achievements"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                );

            case 5:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Skills
                                <Button variant="outline" onClick={addSkill}>
                                    Add Skill Category
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resumeData.skills.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No skills added yet.</p>
                                    <p className="text-sm">Click "Add Skill Category" to get started.</p>
                                </div>
                            ) : (
                                resumeData.skills.map((skill, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">Skill Category {index + 1}</h4>
                                            <Button
                                                variant="outline"
                                                onClick={() => removeSkill(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <div>
                                            <Label>Category Name (e.g., Frontend, Backend, Tools)</Label>
                                            <Input
                                                value={skill.category}
                                                onChange={(e) => updateSkill(index, "category", e.target.value)}
                                                placeholder="e.g., Frontend"
                                            />
                                        </div>
                                        <div>
                                            <Label>Skills (comma-separated)</Label>
                                            <Textarea
                                                value={skill.skills}
                                                onChange={(e) => updateSkill(index, "skills", e.target.value)}
                                                placeholder="e.g., React, TypeScript, Next.js, Tailwind CSS"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                );

            case 6:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Projects
                                <Button variant="outline" onClick={addProject}>
                                    Add Project
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resumeData.projects.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No projects added yet.</p>
                                    <p className="text-sm">Click "Add Project" to get started.</p>
                                </div>
                            ) : (
                                resumeData.projects.map((project, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">Project {index + 1}</h4>
                                            <Button
                                                variant="outline"
                                                onClick={() => removeProject(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <div>
                                            <Label>Project Title</Label>
                                            <Input
                                                value={project.title}
                                                onChange={(e) => updateProject(index, "title", e.target.value)}
                                                placeholder="Project name"
                                            />
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea
                                                value={project.description}
                                                onChange={(e) => updateProject(index, "description", e.target.value)}
                                                placeholder="Describe the project and your role"
                                                rows={3}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>GitHub URL</Label>
                                                <Input
                                                    value={project.githubUrl}
                                                    onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                                                    placeholder="https://github.com/..."
                                                />
                                            </div>
                                            <div>
                                                <Label>Live Demo URL</Label>
                                                <Input
                                                    value={project.liveUrl}
                                                    onChange={(e) => updateProject(index, "liveUrl", e.target.value)}
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Technologies (comma-separated)</Label>
                                            <Input
                                                value={project.technologies.join(", ")}
                                                onChange={(e) => updateProject(index, "technologies", e.target.value.split(", ").filter(t => t.trim()))}
                                                placeholder="React, TypeScript, Node.js"
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                );

            case 7:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Review & Create</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Resume Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Title:</span> {resumeData.title || "Not set"}
                                    </div>
                                    <div>
                                        <span className="font-medium">Template:</span> {resumeData.template}
                                    </div>
                                    <div>
                                        <span className="font-medium">Theme:</span> {resumeData.theme}
                                    </div>
                                    <div>
                                        <span className="font-medium">Name:</span> {resumeData.personal.name || "Not set"}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Sections Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div>• Personal Information: {resumeData.personal.name ? "✓" : "✗"}</div>
                                    <div>• Work Experience: {resumeData.experiences.length} entries</div>
                                    <div>• Education: {resumeData.education.length} entries</div>
                                    <div>• Skills: {resumeData.skills.length} skills</div>
                                    <div>• Projects: {resumeData.projects.length} projects</div>
                                </div>
                            </div>

                            <Button
                                onClick={handleCreateResume}
                                disabled={saving || !resumeData.title.trim()}
                                className="w-full"
                            >
                                {saving ? "Creating Resume..." : "Create Resume"}
                            </Button>
                        </CardContent>
                    </Card>
                );

            default:
                return null;
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Resume</h1>
                    <p className="text-muted-foreground">Step {currentStep} of {steps.length}</p>
                </div>
            </div>

            {/* Data Source Info */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <h3 className="font-medium text-blue-900 mb-1">Portfolio Data Available</h3>
                            <p className="text-sm text-blue-700">
                                Your portfolio data is loaded and ready to use. Click "Pull Default Data" in the first step to automatically fill the form with your existing information.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center transition-colors ${currentStep >= step.id
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-gray-300 text-gray-500 bg-white"
                            }`}>
                            {currentStep > step.id ? (
                                <Check className="h-6 w-6" />
                            ) : (
                                <step.icon className="h-6 w-6" />
                            )}
                        </div>
                        <span className={`ml-3 text-sm font-medium transition-colors ${currentStep >= step.id ? "text-primary" : "text-gray-500"
                            }`}>
                            {step.title}
                        </span>
                        {index < steps.length - 1 && (
                            <div className={`w-8 h-0.5 mx-4 transition-colors ${currentStep > step.id ? "bg-primary" : "bg-gray-300"
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border">
                        {renderStepContent()}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Progress Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Current Step</span>
                                    <span className="text-sm text-muted-foreground">{currentStep} of {steps.length}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {Math.round((currentStep / steps.length) * 100)}% complete
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                variant="outline"
                                onClick={pullDefaultData}
                                disabled={!dataLoaded}
                                className="w-full justify-start bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                            >
                                <Database className="mr-2 h-4 w-4" />
                                Pull Default Data
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/dashboard/resumes")}
                                className="w-full justify-start"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Resumes
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Tips */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Use "Pull Default Data" to import your portfolio information</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>You can edit any information after importing</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Preview your resume before creating</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Step {currentStep} of {steps.length}
                    </span>
                </div>

                {currentStep < steps.length ? (
                    <Button onClick={nextStep} className="px-6">
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleCreateResume}
                        disabled={saving || !resumeData.title.trim()}
                        className="px-6"
                    >
                        {saving ? "Creating..." : "Create Resume"}
                    </Button>
                )}
            </div>
        </div>
    );
}