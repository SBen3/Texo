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
      .then(() => {
        toast.success("Board created successfully!");
        router.push(`/board/${organization.id}`);
      })
      .catch(() => {
        toast.error("Failed to create board.");
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={boardPic}
        alt=""
        width={300}
        height={300}
        className="mx-auto mt-5"
      />
      <p className="flex flex-col items-center gap-2">
        <p className="font-bold text-3xl">No boards found!</p> Create a board to
        get started{" "}
        <button
          onClick={() => handleCreateBoard()}
          className="bg-black rounded-md text-white text-xs p-2 mt-2 cursor-pointer hover:opacity-80"
        >
          Create Board
        </button>
      </p>
    </div>
  );
};
export default BoardUi;
