import { Panel, PanelContent, PanelHeader, PanelTitle } from "../Panel";
import { Prose } from "../ui/typography";
import { Markdown } from "../Markdown";

interface AboutProps {
  data?: {
    title?: string;
    description?: string;
    content?: string;
    imageUrl?: string;
  } | null;
}

export function About({ data }: AboutProps) {
  if (!data) {
    return null;
  }

  return (
    <Panel id="about" className="scroll-mt-[4.75rem]">
      <PanelHeader>
        <PanelTitle>{data.title || "About"}</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Markdown>{data.content || ""}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
