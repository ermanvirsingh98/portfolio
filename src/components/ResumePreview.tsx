import React from "react";
import { format } from "date-fns";

interface ResumeSection {
    id: string;
    type: string;
    title: string;
    content: any;
    order: number;
    isVisible: boolean;
}

interface ResumePreviewProps {
    resume: {
        title: string;
        template: string;
        theme: string;
        fontFamily: string;
        fontSize: string;
        spacing: string;
        sections: ResumeSection[];
    };
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
    const getTemplateStyles = () => {
        const baseStyles = "max-w-4xl mx-auto bg-white shadow-2xl border border-gray-200";

        switch (resume.template) {
            case "modern":
                return `${baseStyles} font-sans`;
            case "classic":
                return `${baseStyles} font-serif`;
            case "minimal":
                return `${baseStyles} font-mono`;
            default:
                return baseStyles;
        }
    };

    const getSpacingStyles = () => {
        switch (resume.spacing) {
            case "compact":
                return "space-y-3";
            case "spacious":
                return "space-y-6";
            default:
                return "space-y-4";
        }
    };

    const renderPersonalSection = (content: any) => (
        <div className="text-center border-b-2 border-gray-300 pb-6 mb-8 bg-gradient-to-r from-gray-50 to-white print:bg-white">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-wide">{content.name}</h1>
            <p className="text-xl text-gray-600 mb-4 font-medium">{content.title}</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-4">
                {content.email && (
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {content.email}
                    </span>
                )}
                {content.phone && (
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {content.phone}
                    </span>
                )}
                {content.website && (
                    <span className="flex items-center gap-1 print:hidden">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {content.website}
                    </span>
                )}
                {content.location && (
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {content.location}
                    </span>
                )}
            </div>
            {content.bio && (
                <p className="mt-4 text-gray-700 max-w-3xl mx-auto leading-relaxed text-base">{content.bio}</p>
            )}
        </div>
    );

    const renderExperienceSection = (content: any[]) => (
        <div className={getSpacingStyles()}>
            {content.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/30 to-transparent p-4 rounded-r-lg">
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{exp.position}</h3>
                            <p className="text-gray-600 font-semibold text-base">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 ml-4">
                            <p className="font-medium">
                                {format(new Date(exp.startDate), "MMM yyyy")} -
                                {exp.isCurrent ? " Present" : format(new Date(exp.endDate), " MMM yyyy")}
                            </p>
                            {exp.location && <p className="text-xs mt-1">{exp.location}</p>}
                        </div>
                    </div>
                    {exp.description && (
                        <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                    )}
                </div>
            ))}
        </div>
    );

    const renderEducationSection = (content: any[]) => (
        <div className={getSpacingStyles()}>
            {content.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-4 border-green-500 bg-gradient-to-r from-green-50/30 to-transparent p-4 rounded-r-lg">
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{edu.degree} in {edu.fieldOfStudy}</h3>
                            <p className="text-gray-600 font-semibold text-base">{edu.institution}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 ml-4">
                            <p className="font-medium">
                                {format(new Date(edu.startDate), "MMM yyyy")} -
                                {edu.isCurrent ? " Present" : format(new Date(edu.endDate), " MMM yyyy")}
                            </p>
                            {edu.location && <p className="text-xs mt-1">{edu.location}</p>}
                        </div>
                    </div>
                    {edu.description && (
                        <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSkillsSection = (content: any[]) => {
        return (
            <div className="space-y-4">
                {content.map((skillGroup, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <h4 className="font-bold text-gray-900 text-lg mr-2">
                                {skillGroup.category}:
                            </h4>
                            <span className="text-gray-700 font-medium">
                                {skillGroup.skills && skillGroup.skills.split(',').map((skill: string, skillIndex: number) => {
                                    const trimmedSkill = skill.trim();
                                    if (trimmedSkill) {
                                        return (
                                            <span key={skillIndex}>
                                                {skillIndex > 0 ? ', ' : ''}{trimmedSkill}
                                            </span>
                                        );
                                    }
                                    return null;
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderProjectsSection = (content: any[]) => (
        <div className={getSpacingStyles()}>
            {content.map((project, index) => (
                <div key={index} className="relative pl-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50/30 to-transparent p-4 rounded-r-lg">
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{project.title}</h3>
                        </div>
                        <div className="flex gap-3 ml-4 print:hidden">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                                >
                                    GitHub
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
                                >
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech: string, techIndex: number) => (
                                <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSection = (section: ResumeSection) => {
        if (!section.isVisible) return null;

        const content = typeof section.content === 'string'
            ? JSON.parse(section.content)
            : section.content;

        return (
            <div key={section.id} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-3 flex items-center">
                    <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm mr-3">
                        {section.title.charAt(0)}
                    </span>
                    {section.title}
                </h2>

                {section.type === "personal" && renderPersonalSection(content)}
                {section.type === "experience" && renderExperienceSection(content)}
                {section.type === "education" && renderEducationSection(content)}
                {section.type === "skills" && renderSkillsSection(content)}
                {section.type === "projects" && renderProjectsSection(content)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8 print:bg-white print:p-0">
            <div className={`${getTemplateStyles()} print:shadow-none print:border-0`}>
                <div className="p-8 md:p-12 print:p-6">
                    <div className={getSpacingStyles()}>
                        {resume.sections
                            .sort((a, b) => a.order - b.order)
                            .map(renderSection)}
                    </div>
                </div>
            </div>
        </div>
    );
} 