import { CollapsibleList } from "@/components/CollapsibleList";

import { CertificationItem } from "./CertificationItem";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../Panel";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  description: string;
  imageUrl?: string;
  url?: string;
  order: number;
}

interface CertificationsProps {
  data: Certification[];
}

export function Certifications({ data }: CertificationsProps) {
  const sortedCertifications = data.sort((a, b) => a.order - b.order);

  return (
    <Panel id="certs" className="scroll-mt-[4.75rem]">
      <PanelHeader>
        <PanelTitle>Certs</PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={sortedCertifications}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Panel>
  );
}
