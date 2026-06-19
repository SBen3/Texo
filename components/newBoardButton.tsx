"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface newBoardButtonProps {
  orgId: string,
  disabled: boolean,
};
const CreateBoard = ({orgId, disabled}: newBoardButtonProps ) => {
  const create = useMutation(api.board.create);
  const router = useRouter();

  const handleCreate = async () => {
    console.log(orgId)
    if (!orgId) return;

    try {
      await create({
        orgId: orgId,
        title: "New Board",
      });
      toast.success("Board created!");
      router.push(`/board/${orgId}`);
    } catch {
      toast.error("Failed to create board.");
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleCreate}
      className={cn(
        "col-span-1 rounded-md bg-teal-700 hover:bg-teal-800 transition flex flex-col items-center justify-center py-6",
        disabled && "opacity-75 cursor-not-allowed"
      )}
    >
      <Plus className="w-12 h-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};

export default CreateBoard;