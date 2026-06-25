import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface toolButtonProp {
  disabaled?: boolean;
  onClick: () => void;
  label: string;
  isActive?: boolean;
  icon: LucideIcon;
}

export const ToolButton = ({
  disabaled,
  onClick,
  label,
  isActive,
  icon: Icon,
}: toolButtonProp) => {
  return (
    <Hint label={label} sideOffset={10} side="right">
      <Button
        disabled={disabaled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
