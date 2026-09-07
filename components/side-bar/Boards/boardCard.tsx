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
import { useRouter } from "next/navigation";

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
  const router = useRouter()

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
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-subtle transition hover:shadow-card" onClick={()=>router.push(`board/${id}`)}>
      <div className="relative h-60 w-full bg-muted" >
        <Image src={imageUrl} alt={title} fill className="object-cover"/>
        <Overlay />
        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Actions id={id} title={title} side="bottom" sideOffset={10}>
            <button className="rounded-full bg-black/30 p-1.5 backdrop-blur hover:bg-black/50">
              <MoreHorizontal className="h-4 w-4 text-white focus:outline focus:outline-lime-300" />
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
      <div className="overflow-hidden rounded-2xl">
        <Skeleton className="h-60 w-full bg-muted" />
      </div>
    </>
  );
};
export default BoardCard;
