import { Nav } from "../Nav/Nav";
import { GitHub } from "../Nav/Github";
import { HeroBanner } from "./HeroBanner";
import { Avatar } from "./Avatar";
import { SimpleTooltip } from "./Tooltip";
import { VerifiedIcon } from "./VerifyIcon";
import { ToggleTheme } from "../ThemeToggle";
import { FlipSentences } from "./FlipSentences";
import { NavDropdown } from "../Nav/NavDropdown";

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
    <header className="relative mt-2">
      <HeroBanner />

      <div className="absolute top-0 right-0 flex items-center gap-3 border-grid bg-background ring ring-grid ring-inset sm:pl-3">
        <Nav className="max-sm:hidden" />

        <div className="flex items-center gap-2">
          <GitHub />
          <ToggleTheme />
          <NavDropdown className="sm:hidden" />
        </div>
      </div>
      <div className="screen-line-after flex border-x border-grid">
        <div className="shrink-0 border-r border-grid">
          <div className="mx-[2px] my-[3px]">
            <Avatar className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background sm:size-40" avatarUrl={avatar} displayName={displayName} />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex grow items-end mask-r-from-60% pb-1 pl-4">
            <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none dark:text-zinc-800">
              {"text-3xl "}
              <span className="inline dark:hidden">text-zinc-950</span>
              <span className="hidden dark:inline">text-zinc-50</span>
              {" font-medium"}
            </div>
          </div>

          <div className="border-t border-grid">
            <h1 className="flex items-center pl-4 font-heading text-3xl font-medium">
              {displayName}
              &nbsp;
              <SimpleTooltip
                content={`Official website of ${displayName}`}
              >
                <VerifiedIcon className="size-[0.6em] translate-y-px text-info-foreground" />
              </SimpleTooltip>
            </h1>

            <div className="h-12 border-t border-grid py-1 pl-4 sm:h-auto">
              <FlipSentences sentences={[bio, ...flipSentences]} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
