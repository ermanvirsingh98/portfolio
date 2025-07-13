import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon, ExternalLink, FolderCodeIcon, Github, Globe } from "lucide-react";
import React from "react";
import Image from "next/image";

import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import { Markdown } from "../Markdown";
import { cn } from "@/lib/utils";

export function ProjectItem({
  className,
  project,
}: {
  className?: string;
  project: any;
}) {
  return (
    <AccordionPrimitive.Item value={project.id} asChild>
      <div className={cn("flex items-center", className)}>
        <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border bg-accent/50 text-muted-foreground shadow-xs">
          <FolderCodeIcon className="size-4" />
        </div>

        <div className="flex-1 border-l border-grid">
          <AccordionPrimitive.Trigger className="group/project flex w-full items-center justify-between gap-4 px-2 py-4 text-left select-none [&[data-state=open]_.lucide-chevron-down]:rotate-180">
            <div>
              <h3 className="mb-1 flex items-center gap-2 font-heading text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/project:underline">
                {project.title}
                {project.liveUrl && (
                  <a
                    className="shrink-0 -translate-y-px text-muted-foreground hover:text-foreground transition-colors"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe className="pointer-events-none size-4" />
                  </a>
                )}
              </h3>

              <p className="font-mono text-sm text-muted-foreground">
                {project.time}
              </p>
            </div>

            <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300" />
          </AccordionPrimitive.Trigger>

          <AccordionPrimitive.Content className="space-y-4 overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            {/* Project Image */}
            {project.imageUrl && (
              <div className="px-2">
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            )}

            {/* Project Description */}
            {project?.description && (
              <div className="px-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Overview</h4>
                <Prose className="text-sm">
                  <Markdown>{project.description}</Markdown>
                </Prose>
              </div>
            )}

            {/* Detailed Content */}
            {project?.content && (
              <div className="px-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Details</h4>
                <Prose className="text-sm">
                  <Markdown>{project.content}</Markdown>
                </Prose>
              </div>
            )}

            {/* Technologies */}
            {Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div className="px-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech: any, index: any) => (
                    <Tag key={index}>{tech}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Project Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="px-2 pb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Links</h4>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      asChild
                      className="flex items-center gap-2"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="size-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      asChild
                      className="flex items-center gap-2"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="size-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </AccordionPrimitive.Content>
        </div>
      </div>
    </AccordionPrimitive.Item>
  );
}
