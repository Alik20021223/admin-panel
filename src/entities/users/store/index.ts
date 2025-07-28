// stores/useStatisticTableStore.ts
import { create } from "zustand";
import { TableRow } from "@entities/users/types";
import { Column } from "@tanstack/react-table";

interface UsersTableState {
  allColumns: Column<TableRow>[]; // 👈 массив всех колонок
  setAllColumns: (columns: Column<TableRow>[]) => void;

  user: TableRow | null;
  setUser: (value: TableRow) => void;
}

export const useUsersTableStore = create<UsersTableState>((set) => ({
  allColumns: [],
  setAllColumns: (columns) => set({ allColumns: columns }),

  user: null,
  setUser: (value) => set({ user: value }),
}));
