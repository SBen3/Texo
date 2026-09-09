"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface newBoardButtonProps {
  orgId: string;
  disabled: boolean;
}
const CreateBoard = ({ orgId, disabled }: newBoardButtonProps) => {
  const create = useMutation(api.board.create);
  const router = useRouter();

  const handleCreate = async () => {
    if (!orgId) return;

    try {
      const boardId = await create({
        orgId: orgId,
        title: "New Board",
      });
      toast.success("Board created!");
      router.push(`/board/${boardId}`);
    } catch {
      toast.error("Failed to create board.");
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleCreate}
      className={cn(
        "col-span-1 flex h-full p-2 flex-row lg:flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-lime-400 hover:text-lime-400",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <div className="flex size-6 lg:size-11 items-center justify-center rounded-full bg-lime-400/10 text-lime-400">
        <Plus className="size-5" strokeWidth={2.5} />
      </div>
      <p className="text-sm font-medium">New Board</p>
    </button>
  );
};

export default CreateBoard;
