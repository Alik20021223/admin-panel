import { create } from "zustand";

interface SharedState {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
}

export const useSharedStore = create<SharedState>((set) => ({
  open: false,
  setOpen: (value: boolean) => set({ open: value }),
  toggle: () => set((state) => ({ open: !state.open })),
}));
