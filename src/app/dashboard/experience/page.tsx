"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

interface ExperiencePosition {
    id: string;
    title: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    experienceId: string;
    order: number;
    year?: string;
    employmentType?: string;
    icon?: string;
    skills?: string[];
}

interface Experience {
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    logoUrl?: string;
    order: number;
    positions: ExperiencePosition[];
}

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/experiences");
            if (response.ok) {
                const data = await response.json();
                setExperiences(data);
            } else {
                toast.error("Failed to fetch experiences");
            }
        } catch (error) {
            console.error("Error fetching experiences:", error);
            toast.error("Error fetching experiences");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this experience?")) {
            return;
        }

        try {
            const response = await fetch(`/api/experiences/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Experience deleted successfully");
                fetchExperiences();
            } else {
                toast.error("Failed to delete experience");
            }
        } catch (error) {
            console.error("Error deleting experience:", error);
            toast.error("Error deleting experience");
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground">
                        Manage your work experience and positions
                    </p>
                </div>
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground">
                        Manage your work experience and positions
                    </p>
                </div>
                <Link href="/dashboard/experience/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                    </Button>
                </Link>
            </div>

            {experiences.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No experiences yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Add your work experience to showcase your professional background
                        </p>
                        <Link href="/dashboard/experience/new">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Your First Experience
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {experiences.map((experience) => (
                        <Card key={experience.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        {experience.logoUrl && (
                                            <img
                                                src={experience.logoUrl}
                                                alt={experience.company}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        )}
                                        <div>
                                            <CardTitle className="text-lg">{experience.company}</CardTitle>
                                            <CardDescription>{experience.position}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {experience.isCurrent && (
                                            <Badge variant="default" className="bg-green-100 text-green-800">
                                                Current
                                            </Badge>
                                        )}
                                        <Link href={`/dashboard/experience/${experience.id}`}>
                                            <Button variant="outline">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDelete(experience.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{experience.location}</span>
                                        <span>•</span>
                                        <span>
                                            {new Date(experience.startDate).toLocaleDateString()} -
                                            {experience.isCurrent
                                                ? " Present"
                                                : experience.endDate
                                                    ? new Date(experience.endDate).toLocaleDateString()
                                                    : ""
                                            }
                                        </span>
                                    </div>

                                    {experience.description && (
                                        <p className="text-sm text-muted-foreground">
                                            {experience.description}
                                        </p>
                                    )}

                                    {experience.positions && experience.positions.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium">Positions:</h4>
                                            {experience.positions.map((position) => (
                                                <div key={position.id} className="pl-4 border-l-2 border-muted">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium">{position.title}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {position.employmentType} • {position.year}
                                                            </p>
                                                        </div>
                                                        {position.isCurrent && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                Current
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {position.skills && position.skills.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {position.skills.slice(0, 5).map((skill, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                            {position.skills.length > 5 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{position.skills.length - 5} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 