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
    <Hint label={name ?? "Teammate"} sideOffset={10}>
      <Avatar
        className="relative w-8 h-8 rounded-full flex items-center justify-center border-2 overflow-hidden"
        style={{ borderColor }}
      >
        {src ? (
          <AvatarImage
            src={src}
            alt={name ?? "user"}
            className="w-full h-full object-cover"
          />
        ) : (
          <AvatarFallback className="text-xs font-semibold text-white" style={{backgroundColor : borderColor}}>
            {fallback}
          </AvatarFallback>
        )}
      </Avatar>
    </Hint>
  );
};