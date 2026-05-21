"use client";
import Overlay from "./overlay";
import Image from "next/image";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite?: boolean;
}
const BoardCard = ({
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
  return <>
    <div className="rounded-lg overflow-hidden">
      <Skeleton className="w-full h-60 bg-muted" />
      </div>

  </>
}
export default BoardCard; 
