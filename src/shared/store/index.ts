import { create } from "zustand";
import { UserInfo } from "@shared/types";

interface SharedState {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
}

export const useSharedStore = create<SharedState>((set) => ({
  open: false,
  setOpen: (value: boolean) => set({ open: value }),
  toggle: () => set((state) => ({ open: !state.open })),

  user: null,
  setUser: (value) => set({ user: value }),
}));
