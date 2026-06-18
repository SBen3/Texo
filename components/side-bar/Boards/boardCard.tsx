"use client";
import Overlay from "./overlay";
import Image from "next/image";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal } from "lucide-react";
import { Actions } from "@/components/action";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface BoardCardProps {
  id: Id<"boards">;
  title: string;
  imageUrl: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite?: boolean;
}
const BoardCard = ({
  id,
  title,
  imageUrl,
  authorName,
  createdAt,
  orgId,
  isFavorite = false,
}: BoardCardProps) => {
  const addFavorite = useMutation(api.board.addFavorite);
  const removeFavorite = useMutation(api.board.removeFavorite);
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
    removeFavorite({ boardId: id })
      .then(() => toast.success("Removed from favorites"))
      .catch(() => toast.error("Something went wrong"))
  } else {
    addFavorite({ boardId: id, orgId })
      .then(() => toast.success("Added to favorites"))
      .catch(() => toast.error("Something went wrong"))  }
  };

  return (
    <div className="group relative border rounded-lg overflow-hidden hover:shadow-md transition">
      <div className="relative w-full h-60 bg-muted">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        <Overlay />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Actions id={id} title={title} side="right">
            <button className="p-1.5 rounded-sm hover:bg-black/10">
              <MoreHorizontal className="h-4 w-4 text-white" />
            </button>
          </Actions>
        </div>
      </div>
      <Footer
        title={title}
        authorName={authorName}
        createdAt={createdAt}
        isFavorite={isFavorite}
        onClick={handleFavorite}
        disabled={false}
      />
    </div>
  );
};

BoardCard.skeleton = function boardCardSkeleton() {
  return (
    <>
      <div className="rounded-lg overflow-hidden">
        <Skeleton className="w-full h-60 bg-muted" />
      </div>
    </>
  );
};
export default BoardCard;
