import MarkdownSync from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";

export function Markdown(props: React.ComponentProps<typeof MarkdownSync>) {
  return (
    <MarkdownSync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        [
          rehypeExternalLinks,
          { target: "_blank", rel: "nofollow noopener noreferrer" },
        ],
      ]}
      {...props}
    />
  );
}
