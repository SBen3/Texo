import { create } from "zustand";

interface RenameModalStore {
  isOpen: boolean;
  initialValues: {
    id: string;
    title: string;
  };
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<RenameModalStore>((set) => ({
  isOpen: false,
  initialValues: { id: "", title: "" },

  onOpen: (id, title) => set({ 
    isOpen: true, 
    initialValues: { id, title } 
  }),

  onClose: () => set({ 
    isOpen: false,
    initialValues: { id: "", title: "" },
  }),
}));    