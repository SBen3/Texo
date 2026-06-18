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
        className="w-44"
        onClick={(e) => e.stopPropagation()} 
      >
        <DropdownMenuItem onClick={onCopyLink} className="cursor-pointer">
          <Link2 className="mr-2 h-4 w-4" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{onOpen(id, title)}} className="cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          title={title}
          description="This will permanently delete the board. This action cannot be undone."
          onConfirm={onDelete}
        >
          <button className="w-full rounded-md p-1 pl-2 flex items-center gap-2 text-[14px] hover:bg-red-100 cursor-pointer text-red-600 ">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete board
          </button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

