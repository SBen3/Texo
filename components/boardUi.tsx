"use client";

import { useOrganization } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LayoutTemplate, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-card">
      <div className="flex size-14 items-center justify-center rounded-full bg-lime-200 text-lime-500">
        <LayoutTemplate className="size-6" strokeWidth={2} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xl font-semibold tracking-[-0.02em] text-foreground">
          No boards yet
        </p>
        <p className="text-sm text-muted-foreground">
          Create your first board to start collaborating.
        </p>
        <Button onClick={handleCreateBoard} className="mt-4">
          <Plus size={14} />
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default BoardUi;
