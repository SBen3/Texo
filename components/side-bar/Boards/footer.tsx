import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorName: string;
  createdAt: number;
  isFavorite: boolean;
  onClick: () => void;
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
    e.stopPropagation(); // 👈 prevent card click when clicking star
    onClick();
  };

  return (
    <div className="relative bg-white p-3">
      <p className="text-sm font-semibold text-slate-800 truncate max-w-[calc(100%-20px)]">
        {title}
      </p>
     <div className="opacity-0 group-hover:opacity-100 transition">
       <p className="text-xs text-muted-foreground truncate">
        {authorName}, {createdAtLabel}
      </p>
      <button
        onClick={handleClick}
        disabled={disabled} 
        className={cn(
          "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "w-4 h-4 hover:stroke-yellow-400 transition",
            isFavorite
              ? "fill-yellow-400 stroke-yellow-400"
              : "stroke-slate-500"
          )}
        />
      </button>
     </div>
    </div>
  );
};

export default Footer;