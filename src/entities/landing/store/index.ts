// stores/useStatisticTableStore.ts
import { create } from "zustand";
import { InfoAddFormResponseType, TableRow } from "@entities/landing/types";
import {
  Updater,
  VisibilityState,
  Column,
  ColumnPinningState,
} from "@tanstack/react-table";
import { MockInitialData } from "../mock";

interface LandingTableState {
  columnVisibility: VisibilityState;
  setColumnVisibility: (updater: Updater<VisibilityState>) => void;

  allColumns: Column<TableRow>[]; // 👈 массив всех колонок
  setAllColumns: (columns: Column<TableRow>[]) => void;

  columnOrder: string[]; // 👈 массив порядок всех колонок
  setColumnOrder: (updater: Updater<string[]>) => void;

  columnPinning: ColumnPinningState;
  setColumnPinning: (updater: Updater<ColumnPinningState>) => void; // для закрепа

  infoData: InfoAddFormResponseType;
  setInfoData: (data: InfoAddFormResponseType) => void;
}

export const useLandingStore = create<LandingTableState>((set, get) => ({
  infoData: MockInitialData,
  setInfoData: (data) => set({infoData: data}),

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

  columnPinning: { left: [], right: [] },
  setColumnPinning: (updater) => {
    console.log("[Zustand] setColumnPinning called", updater);
    const old = get().columnPinning;
    const newState = typeof updater === "function" ? updater(old) : updater;
    set({ columnPinning: newState });
  },
}));
