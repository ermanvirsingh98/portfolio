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

// Particle component for animated background elements
const AnimatedParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background particles - more spread out */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute w-1 h-1 bg-primary/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Medium floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`medium-${i}`}
          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger floating elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary/25 to-primary/8 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle background dots */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-0.5 h-0.5 bg-muted-foreground/15 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.05, 0.3, 0.05],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Occasional sparkle effects */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

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
      {/* Background particles for entire header */}
      <AnimatedParticles />

      <HeroBanner />

      {/* Simple navigation bar */}
      <motion.div
        className="absolute top-0 right-0 flex items-center gap-3 bg-background/90 backdrop-blur-sm border border-border/50 rounded-bl-lg shadow-sm z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <Nav className="max-sm:hidden" />

        <div className="flex items-center gap-2 p-2">
          <GitHub />
          <ToggleTheme />
          <NavDropdown className="sm:hidden" />
        </div>
      </motion.div>

      {/* Clean profile section */}
      <div className="screen-line-after border-x border-border/50 bg-background/95 backdrop-blur-sm relative">
        <div className="relative p-6">
          {/* Simple header layout */}
          <div className="flex flex-col gap-4">
            {/* Clean code snippet */}
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <div className="font-mono text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-md border border-border/30">
                {"text-2xl font-medium"}
              </div>
            </motion.div>

            {/* Name and content section */}
            <div className="flex items-start justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="flex-1"
              >
                {/* Clean name section */}
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="font-heading text-3xl font-semibold text-foreground">
                    {displayName}
                  </h1>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                  >
                    <SimpleTooltip
                      content={`Official website of ${displayName}`}
                    >
                      <VerifiedIcon className="size-5 text-primary" />
                    </SimpleTooltip>
                  </motion.div>
                </div>

                {/* Simple status indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Available for opportunities
                  </span>
                </div>

                {/* Clean bio section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                  className="text-muted-foreground"
                >
                  <FlipSentences sentences={[bio, ...flipSentences]} />
                </motion.div>
              </motion.div>

              {/* Simple decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                className="hidden sm:block"
              >
                <div className="h-8 w-1 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
              </motion.div>
            </div>

            {/* Simple bottom line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
