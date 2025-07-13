import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    User,
    Briefcase,
    Code,
    Award,
    GraduationCap,
    Globe,
    Settings,
    ExternalLink,
} from "lucide-react";

const sections = [
    {
        name: "Overview",
        description: "Manage your personal information and current jobs",
        href: "/dashboard/overview",
        icon: User,
        color: "text-blue-600",
    },
    {
        name: "About",
        description: "Manage your personal information and bio",
        href: "/dashboard/about",
        icon: User,
        color: "text-blue-600",
    },
    {
        name: "Experience",
        description: "Manage your work experience and positions",
        href: "/dashboard/experience",
        icon: Briefcase,
        color: "text-green-600",
    },
    {
        name: "Projects",
        description: "Manage your portfolio projects",
        href: "/dashboard/projects",
        icon: Code,
        color: "text-purple-600",
    },
    {
        name: "Skills",
        description: "Manage your technical skills and tech stack",
        href: "/dashboard/skills",
        icon: Code,
        color: "text-orange-600",
    },
    {
        name: "Education",
        description: "Manage your educational background",
        href: "/dashboard/education",
        icon: GraduationCap,
        color: "text-indigo-600",
    },
    {
        name: "Awards",
        description: "Manage your awards and recognitions",
        href: "/dashboard/awards",
        icon: Award,
        color: "text-red-600",
    },
    {
        name: "Certifications",
        description: "Manage your professional certifications",
        href: "/dashboard/certifications",
        icon: Award,
        color: "text-yellow-600",
    },
    {
        name: "Social Links",
        description: "Manage your social media and contact links",
        href: "/dashboard/social-links",
        icon: Globe,
        color: "text-teal-600",
    },
    {
        name: "Settings",
        description: "Manage your portfolio settings",
        href: "/dashboard/settings",
        icon: Settings,
        color: "text-gray-600",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Manage your portfolio content and settings
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sections.map((section) => (
                    <Card key={section.name} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <section.icon className={`h-5 w-5 ${section.color}`} />
                                <CardTitle className="text-lg">{section.name}</CardTitle>
                            </div>
                            <CardDescription>{section.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={section.href}>
                                <Button className="w-full">
                                    Manage {section.name}
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Quick access to common tasks
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Link href="/">
                        <Button variant="outline">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Portfolio
                        </Button>
                    </Link>
                    <Link href="/dashboard/overview">
                        <Button variant="outline">
                            <User className="mr-2 h-4 w-4" />
                            Edit Overview
                        </Button>
                    </Link>
                    <Link href="/dashboard/projects">
                        <Button variant="outline">
                            <Code className="mr-2 h-4 w-4" />
                            Add Project
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
} 