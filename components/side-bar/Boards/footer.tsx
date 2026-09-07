import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorName: string;
  createdAt: number;
  isFavorite: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const Footer = ({
  title,
  authorName,
  createdAt,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <div className="relative bg-card p-3">
      <p className="max-w-[calc(100%-24px)] truncate text-sm font-medium text-foreground">
        {title}
      </p>
      <p className="truncate text-xs text-muted-foreground opacity-0 transition group-hover:opacity-100">
        {authorName}, {createdAtLabel}
      </p>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "absolute top-3 right-3 opacity-0 transition group-hover:opacity-100",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4 transition hover:stroke-lime-400",
            isFavorite
              ? "fill-lime-400 stroke-lime-400"
              : "stroke-muted-foreground"
          )}
        />
      </button>
    </div>
  );
};

export default Footer;
