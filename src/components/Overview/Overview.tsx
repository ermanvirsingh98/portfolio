import { LinkIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { motion } from "motion/react";

import { Panel, PanelContent } from "../Panel";
import { JobItem } from "./JobItem";
import { IntroItem } from "./IntroItem";
import { urlToName } from "@/lib/utils";

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
  positions?: Array<{
    id: string;
    title: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    experienceId: string;
    order: number;
  }>;
}

interface OverviewProps {
  data?: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    username?: string;
    gender?: string;
    bio?: string;
    flipSentences?: string[];
    address?: string;
    phoneNumber?: string;
    email?: string;
    website?: string;
    otherWebsites?: string[];
    dateOfBirth?: string;
    jobTitle?: string;
    avatar?: string;
    ogImage?: string;
    keywords?: string;
    dateCreated?: string;
  } | null;
  experiences?: Experience[];
}

export function Overview({ data, experiences }: OverviewProps) {
  if (!data) {
    return null;
  }

  // Get current jobs from experiences
  const currentJobs = experiences?.filter(exp => {
    // Check if any position in this experience is current
    return exp.positions?.some(position => position.isCurrent) || false;
  }) || [];

  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2">
        {currentJobs.map((experience, index) => {
          // Get all current positions for this experience
          const currentPositions = experience.positions?.filter(position => position.isCurrent) || [];

          return currentPositions.map((position, posIndex) => (
            <motion.div
              key={`${experience.id}-${position.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1 + posIndex * 0.05,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <JobItem
                title={position.title}
                company={experience.company}
                website={experience.logoUrl} // Using logoUrl as website for now
              />
            </motion.div>
          ));
        })}

        {data.address && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <IntroItem icon={<MapPinIcon />} content={data.address} />
          </motion.div>
        )}

        {data.phoneNumber && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <IntroItem
              icon={<PhoneIcon />}
              content={data.phoneNumber}
              href={data.phoneNumber}
            />
          </motion.div>
        )}

        {data.email && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            <IntroItem icon={<MailIcon />} content={data.email} href={data.email} />
          </motion.div>
        )}

        {data.website && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            <IntroItem
              icon={<LinkIcon />}
              content={urlToName(data.website as string)}
              href={data.website}
            />
          </motion.div>
        )}
      </PanelContent>
    </Panel>
  );
}
