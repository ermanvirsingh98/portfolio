import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { CollapsibleList } from "@/components/CollapsibleList";

import { ProjectItem } from "./ProjectItem";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "../Panel";

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
}

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  const sortedProjects = data.sort((a, b) => a.order - b.order);
  const featuredProject = sortedProjects.find(project => project.featured);

  return (
    <Panel id="projects" className="scroll-mt-[4.75rem]">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <AccordionPrimitive.Root
        type="single"
        defaultValue={featuredProject?.id || sortedProjects[0]?.id}
        collapsible
      >
        <CollapsibleList
          items={sortedProjects}
          renderItem={(item) => <ProjectItem project={item} />}
        />
      </AccordionPrimitive.Root>
    </Panel>
  );
}
