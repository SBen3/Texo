import Hint from "@/components/hint";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
}: UserAvatarProps) => {
  return (
    <Hint label={name ?? "Teammate"} sideOffset={10} side="left" >
      <Avatar
        className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-card ring-2"
        style={{ ["--tw-ring-color" as string]: borderColor }}
      >
        {src ? (
          <AvatarImage
            src={src}
            alt={name ?? "user"}
            className="h-full w-full object-cover"
          />
        ) : (
          <AvatarFallback className="text-xs font-semibold text-white" style={{ backgroundColor: borderColor }}>
            {fallback}
          </AvatarFallback>
        )}
      </Avatar>
    </Hint>
  );
};