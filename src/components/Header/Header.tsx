import { Nav } from "../Nav/Nav";
import { GitHub } from "../Nav/Github";
import { HeroBanner } from "./HeroBanner";
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

  return (
    <motion.header
      className="relative mt-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <HeroBanner />

      {/* Modern navigation bar with enhanced styling */}
      <motion.div
        className="absolute top-0 right-0 flex items-center gap-3 border-border/50 bg-background/90 backdrop-blur-md ring-1 ring-border/30 ring-inset sm:pl-3 rounded-bl-xl shadow-xl"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <Nav className="max-sm:hidden" />

        <div className="flex items-center gap-2 p-2">
          <GitHub />
          <ToggleTheme />
          <NavDropdown className="sm:hidden" />
        </div>
      </motion.div>

      {/* Creative modern profile section */}
      <div className="screen-line-after border-x border-border/50 bg-gradient-to-r from-background via-background/95 to-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0)_1px,transparent_0)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255)_1px,transparent_0)]" />

        <div className="relative p-6">
          {/* Creative header layout */}
          <div className="flex flex-col gap-4">
            {/* Modern code snippet decoration */}
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <div className="line-clamp-1 font-mono text-xs text-muted-foreground/80 select-none bg-muted/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/30">
                {"text-3xl "}
                <span className="inline dark:hidden">text-zinc-950</span>
                <span className="hidden dark:inline">text-zinc-50</span>
                {" font-medium"}
              </div>
            </motion.div>

            {/* Creative name and status section */}
            <div className="flex items-start justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="flex-1"
              >
                {/* Enhanced name section with creative layout */}
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-heading text-3xl font-semibold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text">
                    {displayName}
                  </h1>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                  >
                    <SimpleTooltip
                      content={`Official website of ${displayName}`}
                    >
                      <VerifiedIcon className="size-5 text-primary" />
                    </SimpleTooltip>
                  </motion.div>
                </div>

                {/* Creative status indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-green-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                    </motion.div>
                    <span className="text-sm text-muted-foreground font-mono">Available for opportunities</span>
                  </div>
                </div>

                {/* Enhanced bio section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                  className="relative"
                >
                  <FlipSentences sentences={[bio, ...flipSentences]} />
                </motion.div>
              </motion.div>

              {/* Creative decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="hidden sm:flex flex-col items-end gap-2"
              >
                {/* Decorative gradient bars */}
                <div className="flex gap-1">
                  <div className="h-8 w-1 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                  <div className="h-8 w-1 bg-gradient-to-b from-primary/40 to-primary/10 rounded-full" />
                  <div className="h-8 w-1 bg-gradient-to-b from-primary/20 to-primary/5 rounded-full" />
                </div>

                {/* Creative corner accent */}
                <div className="h-6 w-6 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
              </motion.div>
            </div>

            {/* Creative bottom accent */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
