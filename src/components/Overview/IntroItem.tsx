import { JSX } from "react";
import { motion } from "motion/react";

export function IntroItem({
  icon,
  content,
  href,
}: {
  icon: JSX.Element;
  content: React.ReactNode;
  href?: string;
}) {
  const isLink = !!href;

  return (
    <motion.div
      className="flex items-center gap-4 font-mono text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {icon}

      <p className="text-balance">
        {isLink ? (
          <a
            className="underline-offset-4 hover:underline transition-all duration-200"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </p>
    </motion.div>
  );
}
