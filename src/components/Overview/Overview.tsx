import { LinkIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

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
        {currentJobs.map((experience) => {
          // Get all current positions for this experience
          const currentPositions = experience.positions?.filter(position => position.isCurrent) || [];

          return currentPositions.map((position) => (
            <JobItem
              key={`${experience.id}-${position.id}`}
              title={position.title}
              company={experience.company}
              website={experience.logoUrl} // Using logoUrl as website for now
            />
          ));
        })}

        {data.address && (
          <IntroItem icon={<MapPinIcon />} content={data.address} />
        )}

        {data.phoneNumber && (
          <IntroItem
            icon={<PhoneIcon />}
            content={data.phoneNumber}
            href={data.phoneNumber}
          />
        )}

        {data.email && (
          <IntroItem icon={<MailIcon />} content={data.email} href={data.email} />
        )}

        {data.website && (
          <IntroItem
            icon={<LinkIcon />}
            content={urlToName(data.website as string)}
            href={data.website}
          />
        )}
      </PanelContent>
    </Panel>
  );
}
