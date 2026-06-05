"use client";
import Overlay from "./overlay";
import Image from "next/image";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal } from "lucide-react";
import {Actions} from "@/components/action";
import { Id } from "@/convex/_generated/dataModel";

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
  isFavorite = false,
}: BoardCardProps) => {
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
        onClick={() => {}} // 👈 wire up favorite toggle later
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
