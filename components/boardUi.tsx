"use client";

import Image from "next/image";
import boardPic from "@/public/board.png";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BoardUi = () => {
  const { organization } = useOrganization();
  const router = useRouter();
  const create = useMutation(api.board.create);

  const handleCreateBoard = async () => {
    if (!organization) return;
    await create({ orgId: organization.id, title: "New Board" })
      .then((boardId) => {
        toast.success("Board created successfully!");
        router.push(`/board/${boardId}`);
      })
      .catch(() => {
        toast.error("Failed to create board.");
      });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0px_0px_black]">
      <div className="relative h-16 w-16">
        <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[#1040C0]" />
        <div className="absolute bottom-0 right-0 h-8 w-8 rotate-45 bg-[#F0C020]" />
      </div>
      <Image src={boardPic} alt="" width={220} height={220} className="grayscale" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-3xl font-black uppercase tracking-tighter">No Boards Found</p>
        <p className="font-medium text-black/70">Create a board to get started.</p>
        <button
          onClick={handleCreateBoard}
          className="mt-2 border-2 border-black bg-[#D02020] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_black] transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          Create Board
        </button>
      </div>
    </div>
  );
};

export default BoardUi;