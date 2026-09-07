"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import ConfirmModal from "@/components/confirm-modal";

import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: Id<"boards">;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const mutate = useMutation(api.boards.remove);
    const { onOpen } = useRenameModal();
  const onDelete = () => {
    mutate({ id })
      .then(() => {
        toast.success("Board deleted!");
      })
      .catch(() => {
        toast.error("Failed to delete board.");
      });
  };

  const onCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/board/${id}`);
    toast.success("Link copied!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-44 absolute"
        onClick={(e) => e.stopPropagation()} 
      >
        <DropdownMenuItem onClick={onCopyLink} className="cursor-pointer focus:text-lime-500 focus:bg-lime-100">
          <Link2 className="mr-2 h-4 w-4 text-lime-500" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{onOpen(id, title)}} className="cursor-pointer focus:text-lime-500 focus:bg-lime-100">
          <Pencil className="mr-2 h-4 w-4 text-lime-500" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          title={title}
          description="This will permanently delete the board. This action cannot be undone."
          onConfirm={onDelete}
        >
          <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm p-1.5 pl-2 text-sm text-destructive hover:bg-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete board
          </button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

