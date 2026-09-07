"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Hint from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/action";
import { Menu } from "lucide-react";

interface InfoProp {
  boardId: string;
}

export const Info = ({ boardId }: InfoProp) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, { boardId: boardId as Id<"boards"> });
  if (!data) return <InfoSkeleton />;

  const TapSeparator = () => {
    return <div className="h-4 w-px bg-border" />;
  };

  return (
    <div
      suppressHydrationWarning
      className="absolute left-2 top-2 flex h-[52px] min-w-[100px] flex-row items-center gap-1 rounded-2xl border border-border bg-card px-2 py-1 shadow-card"
    >
      <Hint label="Go to boards" sideOffset={10}>
        <Link href="/">
          <Button
            variant="board"
            size="sm"
            asChild={false}
            className="group px-2 hover:bg-lime-200/30 hover:text-lime-600"
          >
            <span className="flex flex-row items-center gap-2 text-foreground">
              <Image
                src="/icon.svg"
                alt="board logo"
                width={26}
                height={26}
                className="rounded-md"
              />
              <span className="text-sm font-semibold tracking-[-0.02em] group-hover:text-lime-600">
                Texo
              </span>
            </span>
          </Button>
        </Link>
      </Hint>
      <TapSeparator />
      <Hint label="Board name" sideOffset={10}>
        <Button
          className="text-sm font-medium text-foreground hover:bg-lime-200/30 hover:text-lime-600"
          variant="board"
          size="sm"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TapSeparator />
      <Hint label="Edit board" sideOffset={15}>
      
          <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
            <Button
              variant="board"
              size="icon-sm"
              className="hover:bg-lime-200/30 hover:text-lime-600"
            >
              <Menu size={16} />
            </Button>
          </Actions>
      </Hint>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 h-[52px] w-[300px] animate-pulse rounded-2xl bg-muted px-4 py-2 shadow-card"></div>
  );
};
