import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface toolButtonProp {
  isDisabled?: boolean;
  onClick: () => void;
  label: string;
  isActive?: boolean;
  icon: LucideIcon;
}

export const ToolButton = ({
  isDisabled,
  onClick,
  label,
  isActive,
  icon: Icon,
}: toolButtonProp) => {
  return (
    <Hint label={label} sideOffset={10} side="right">
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
