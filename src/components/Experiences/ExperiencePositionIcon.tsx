import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
  LightbulbIcon,
  LucideProps,
  SchoolIcon,
} from "lucide-react";

const iconMap: Record<any, React.ComponentType<LucideProps>> = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  education: GraduationCapIcon,
  business: BriefcaseBusinessIcon,
  school: SchoolIcon,
  idea: LightbulbIcon,
};

export function ExperienceIcon({
  icon,
  ...props
}: {
  icon: any | undefined;
} & LucideProps) {
  const IconComponent = icon ? iconMap[icon] : BriefcaseBusinessIcon;
  return <IconComponent {...props} />;
}
