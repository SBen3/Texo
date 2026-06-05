"use client";

import { useState, useEffect } from "react";
import { useRenameModal } from "@/store/use-rename-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const update = useMutation(api.boards.update);

  const [title, setTitle] = useState(initialValues.title);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit = async () => {
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await update({ id: initialValues.id as Id<"boards">, title });
      toast.success("Board renamed!");
      onClose();
    } catch {
      toast.error("Failed to rename board");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Board</DialogTitle>
          <DialogDescription>
            Enter a new name for this board.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board title"
          maxLength={60}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          disabled={isLoading}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={isLoading || !title.trim()}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};