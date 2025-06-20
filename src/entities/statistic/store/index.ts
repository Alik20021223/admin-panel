// stores/useStatisticTableStore.ts
import { create } from "zustand";
import { FilterInputType, TableRow } from "@entities/statistic/types";
import {
  Updater,
  VisibilityState,
  Column,
  ColumnPinningState,
} from "@tanstack/react-table";

interface StatisticTableState {
  columnFilter: FilterInputType[];
  setColumnFilter: (filters: FilterInputType[]) => void;

  columnVisibility: VisibilityState;
  setColumnVisibility: (updater: Updater<VisibilityState>) => void;

  allColumns: Column<TableRow>[]; // 👈 массив всех колонок
  setAllColumns: (columns: Column<TableRow>[]) => void;

  columnOrder: string[]; // 👈 массив порядок всех колонок
  setColumnOrder: (updater: Updater<string[]>) => void;

  columnPinning: ColumnPinningState;
  setColumnPinning: (updater: Updater<ColumnPinningState>) => void; // для закрепа
}

export const useStatisticTableStore = create<StatisticTableState>(
  (set, get) => ({
    columnFilter: [],
    setColumnFilter: (filters) => set({ columnFilter: filters }),

    columnVisibility: {},
    setColumnVisibility: (updater) => {
      console.log("[Zustand] setColumnVisibility called", updater);
      const old = get().columnVisibility;
      const newState = typeof updater === "function" ? updater(old) : updater;
      set({ columnVisibility: newState });
    },

    allColumns: [],
    setAllColumns: (columns) => set({ allColumns: columns }),

    columnOrder: [],
    setColumnOrder: (updater) => {
      const old = get().columnOrder;
      const newOrder = typeof updater === "function" ? updater(old) : updater;
      set({ columnOrder: newOrder });
    },

    columnPinning: { left: ["name"], right: [] },
    setColumnPinning: (updater) => {
      console.log("[Zustand] setColumnPinning called", updater);
      const old = get().columnPinning;
      const newState = typeof updater === "function" ? updater(old) : updater;
      set({ columnPinning: newState });
    },
  })
);
