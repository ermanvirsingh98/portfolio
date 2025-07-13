import Image from "next/image";
import { SimpleTooltip } from "../ui/tooltip";

interface Skill {
  id: string;
  name: string;
  category: string;
  iconUrl?: string;
  level: number;
  order: number;
}

interface TechStackContentProps {
  data: Skill[];
}

export function TeckStackContent({ data }: TechStackContentProps) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-wrap gap-4 select-none">
      {safeData.map((skill: Skill) => {
        // Safety check for skill object
        if (!skill || typeof skill !== 'object') {
          return null;
        }

        const iconUrl = skill.iconUrl || `/images/tech-stack-icons/${skill.name?.toLowerCase() || 'default'}.svg`;

        return (
          <SimpleTooltip key={skill.id || skill.name} content={`${skill.name || 'Skill'} (Level ${skill.level || 1})`}>
            <div className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-accent transition-colors">
              {iconUrl && iconUrl.trim() !== "" ? (
                <Image
                  src={iconUrl}
                  alt={`${skill.name || 'Skill'} icon`}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  onError={(e) => {
                    // Fallback to a default icon if the image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/tech-stack-icons/js.svg";
                  }}
                />
              ) : (
                <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {skill.name && skill.name.charAt(0) ? skill.name.charAt(0).toUpperCase() : "?"}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium">{skill.name || "Unknown Skill"}</span>
            </div>
          </SimpleTooltip>
        );
      })}
    </div>
  );
}
