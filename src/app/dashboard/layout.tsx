"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    LayoutDashboard,
    User,
    Briefcase,
    Code,
    Award,
    GraduationCap,
    Globe,
    Settings,
    Menu,
    X,
    Home,
    LogOut,
    FileText,
} from "lucide-react";
import { UserButton, SignOutButton } from "@clerk/nextjs";
import { ProtectedRoute } from "@/components/auth/protected-route";

const navigation = [
    { name: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
    { name: "About", href: "/dashboard/about", icon: User },
    { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
    { name: "Projects", href: "/dashboard/projects", icon: Code },
    { name: "Skills", href: "/dashboard/skills", icon: Code },
    { name: "Education", href: "/dashboard/education", icon: GraduationCap },
    { name: "Awards", href: "/dashboard/awards", icon: Award },
    { name: "Certifications", href: "/dashboard/certifications", icon: Award },
    { name: "Social Links", href: "/dashboard/social-links", icon: Globe },
    { name: "Resume Builder", href: "/dashboard/resumes", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                {/* Mobile sidebar */}
                <div
                    className={cn(
                        "fixed inset-0 z-50 lg:hidden",
                        sidebarOpen ? "block" : "hidden"
                    )}
                >
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
                    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r">
                        <div className="flex h-full flex-col">
                            <div className="flex h-16 items-center justify-between px-6 border-b">
                                <h1 className="text-lg font-semibold">Portfolio Admin</h1>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <nav className="flex-1 space-y-1 px-4 py-4">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                            )}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <item.icon className="mr-3 h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                            <div className="border-t p-4 space-y-2">
                                <Link href="/">
                                    <Button variant="outline" className="w-full">
                                        <Home className="mr-2 h-4 w-4" />
                                        View Portfolio
                                    </Button>
                                </Link>
                                <SignOutButton>
                                    <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </Button>
                                </SignOutButton>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop sidebar */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background border-r px-6 pb-4">
                        <div className="flex h-16 items-center border-b">
                            <h1 className="text-lg font-semibold">Portfolio Admin</h1>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                                            isActive
                                                                ? "bg-primary text-primary-foreground"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                                        )}
                                                    >
                                                        <item.icon className="mr-3 h-4 w-4" />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                                <li className="mt-auto space-y-2">
                                    <Link href="/">
                                        <Button variant="outline" className="w-full">
                                            <Home className="mr-2 h-4 w-4" />
                                            View Portfolio
                                        </Button>
                                    </Link>
                                    <SignOutButton>
                                        <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign Out
                                        </Button>
                                    </SignOutButton>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:pl-72">
                    {/* Top bar */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <Button
                            type="button"
                            variant="ghost"
                            className="-m-2.5 p-2.5 text-muted-foreground lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>

                        <Separator orientation="vertical" className="h-6" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="flex flex-1"></div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "w-8 h-8",
                                            userButtonTrigger: "focus:shadow-none",
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Page content */}
                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
} 