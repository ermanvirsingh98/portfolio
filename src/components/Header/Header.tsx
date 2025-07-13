import { Nav } from "../Nav/Nav";
import { GitHub } from "../Nav/Github";
import { HeroBanner } from "./HeroBanner";
import { Avatar } from "./Avatar";
import { SimpleTooltip } from "./Tooltip";
import { VerifiedIcon } from "./VerifyIcon";
import { ToggleTheme } from "../ThemeToggle";
import { FlipSentences } from "./FlipSentences";
import { NavDropdown } from "../Nav/NavDropdown";
import { motion } from "motion/react";

interface Overview {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  gender?: string;
  bio?: string;
  flipSentences: string[];
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  otherWebsites: string[];
  dateOfBirth?: string;
  jobTitle?: string;
  avatar?: string;
  ogImage?: string;
  keywords?: string;
  dateCreated?: string;
}

interface HeaderProps {
  overview?: Overview | null;
}

export function Header({ overview }: HeaderProps) {
  // Fallback to default values if overview is not available
  const displayName = overview?.displayName || "Your Name";
  const bio = overview?.bio || "Creating with code, driven by passion.";
  const flipSentences = overview?.flipSentences || [
    "Front End Developer",
    "Software Developer",
    "React Developer",
  ];
  const avatar = overview?.avatar || "/images/chanhdai-avatar-ghibli.jpeg";

  return (
    <motion.header
      className="relative mt-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <HeroBanner />

      {/* Enhanced navigation bar */}
      <div className="absolute top-0 right-0 flex items-center gap-3 border-grid bg-background/95 backdrop-blur-sm ring ring-grid ring-inset sm:pl-3 rounded-bl-lg shadow-lg">
        <Nav className="max-sm:hidden" />

        <div className="flex items-center gap-2 p-2">
          <GitHub />
          <ToggleTheme />
          <NavDropdown className="sm:hidden" />
        </div>
      </div>

      {/* Enhanced profile section */}
      <div className="screen-line-after flex border-x border-grid bg-gradient-to-r from-background via-background/95 to-background">
        <div className="shrink-0 border-r border-grid relative">
          <div className="mx-[2px] my-[3px] relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <Avatar
                className="size-32 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background shadow-lg hover:shadow-xl transition-all duration-300 sm:size-40"
                avatarUrl={avatar}
                displayName={displayName}
              />
            </motion.div>

            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-green-500 border-2 border-background shadow-sm" />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {/* Code snippet decoration */}
          <div className="flex grow items-end mask-r-from-60% pb-1 pl-4">
            <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none dark:text-zinc-800 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
              {"text-3xl "}
              <span className="inline dark:hidden">text-zinc-950</span>
              <span className="hidden dark:inline">text-zinc-50</span>
              {" font-medium"}
            </div>
          </div>

          <div className="border-t border-grid">
            {/* Enhanced name section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="flex items-center pl-4 font-heading text-3xl font-medium bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                {displayName}
                &nbsp;
                <SimpleTooltip
                  content={`Official website of ${displayName}`}
                >
                  <VerifiedIcon className="size-[0.6em] translate-y-px text-info-foreground" />
                </SimpleTooltip>
              </h1>
            </motion.div>

            {/* Enhanced bio section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
              className="h-12 border-t border-grid py-1 pl-4 sm:h-auto relative"
            >
              <FlipSentences sentences={[bio, ...flipSentences]} />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
