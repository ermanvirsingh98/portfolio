import Image from "next/image";
import ImgAvatar from "@/../public/images/chanhdai-avatar-ghibli.jpeg";

interface AvatarProps {
  className?: string;
  size?: number;
  priority?: boolean;
  avatarUrl?: string;
  displayName?: string;
}

export function Avatar({
  className,
  size = 150,
  priority = true,
  avatarUrl,
  displayName = "User",
}: AvatarProps) {
  const imageSrc = avatarUrl || ImgAvatar;

  return (
    <Image
      className={className}
      alt={`${displayName}'s avatar`}
      src={imageSrc}
      width={size}
      height={size}
      quality={100}
      priority={priority}
    />
  );
}
