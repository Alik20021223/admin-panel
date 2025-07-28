// stores/useStatisticTableStore.ts
import { create } from "zustand";
import { TableRow } from "@entities/domen/types";
import { Updater, Column } from "@tanstack/react-table";

interface DomenTableState {
  allColumns: Column<TableRow>[]; // 👈 массив всех колонок
  setAllColumns: (columns: Column<TableRow>[]) => void;

  columnOrder: string[]; // 👈 массив порядок всех колонок
  setColumnOrder: (updater: Updater<string[]>) => void;
}

export const useDomenTableStore = create<DomenTableState>((set, get) => ({
  allColumns: [],
  setAllColumns: (columns) => set({ allColumns: columns }),

  columnOrder: [],
  setColumnOrder: (updater) => {
    const old = get().columnOrder;
    const newOrder = typeof updater === "function" ? updater(old) : updater;
    set({ columnOrder: newOrder });
  },
}));
