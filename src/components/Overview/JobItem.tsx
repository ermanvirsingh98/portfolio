import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  LightbulbIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { IntroItem } from "./IntroItem";

function getJobIcon(title: string) {
  if (/(developer|engineer)/i.test(title)) {
    return <CodeXmlIcon />;
  }

  if (/(founder|co-founder)/i.test(title)) {
    return <LightbulbIcon />;
  }

  return <BriefcaseBusinessIcon />;
}

export function JobItem({
  title,
  company,
  website,
}: {
  title: string;
  company: string;
  website?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <IntroItem
        icon={getJobIcon(title)}
        content={
          <>
            {title} @
            {website ? (
              <a
                className="ml-0.5 transition-colors duration-200 hover:text-primary"
                href={website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company}
              </a>
            ) : (
              <span className="ml-0.5">{company}</span>
            )}
          </>
        }
      />
    </motion.div>
  );
}
