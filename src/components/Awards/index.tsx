import * as AccordionPrimitive from "@radix-ui/react-accordion";
import dayjs from "dayjs";

import { CollapsibleList } from "@/components/CollapsibleList";
import { AwardItem } from "./AwardItem";
import { Panel, PanelHeader, PanelTitle } from "../Panel";

interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl?: string;
  url?: string;
  order: number;
}

interface AwardsProps {
  data: Award[];
}

export function Awards({ data }: AwardsProps) {
  const sortedAwards = [...data].sort((a, b) => {
    return dayjs(b.date).diff(dayjs(a.date));
  });

  return (
    <Panel id="awards" className="scroll-mt-[4.75rem]">
      <PanelHeader>
        <PanelTitle>Awards</PanelTitle>
      </PanelHeader>

      <AccordionPrimitive.Root type="single" collapsible>
        <CollapsibleList
          items={sortedAwards}
          max={3}
          keyExtractor={(item: Award) => item.id}
          renderItem={(item: Award) => <AwardItem award={item} />}
        />
      </AccordionPrimitive.Root>
    </Panel>
  );
}
