// stores/useStatisticTableStore.ts
import { create } from "zustand";
import { TableRowFollower, TableRowСonversion } from "@entities/spots/types";
import {
  Updater,
  VisibilityState,
  Column,
  ColumnPinningState,
} from "@tanstack/react-table";

interface SpotsTableState {
  columnVisibilityConversion: VisibilityState;
  setColumnVisibilityConversion: (updater: Updater<VisibilityState>) => void;

  allColumnsConversion: Column<TableRowСonversion>[]; // 👈 массив всех колонок
  setAllColumnsConversion: (columns: Column<TableRowСonversion>[]) => void;

  columnOrderConversion: string[]; // 👈 массив порядок всех колонок
  setColumnOrderConversion: (updater: Updater<string[]>) => void;

  columnPinningConversion: ColumnPinningState;
  setColumnPinningConversion: (updater: Updater<ColumnPinningState>) => void; // для закрепа

  //--------------------------//

  columnVisibilityFollower: VisibilityState;
  setColumnVisibilityFollower: (updater: Updater<VisibilityState>) => void;

  allColumnsFollower: Column<TableRowFollower>[]; // 👈 массив всех колонок
  setAllColumnsFollower: (columns: Column<TableRowFollower>[]) => void;

  columnOrderFollower: string[]; // 👈 массив порядок всех колонок
  setColumnOrderFollower: (updater: Updater<string[]>) => void;

  columnPinningFollower: ColumnPinningState;
  setColumnPinningFollower: (updater: Updater<ColumnPinningState>) => void; // для закрепа
}

export const useSpotsTableStore = create<SpotsTableState>((set, get) => ({
  columnVisibilityConversion: {},
  setColumnVisibilityConversion: (updater) => {
    const old = get().columnVisibilityConversion;
    const newState = typeof updater === "function" ? updater(old) : updater;
    set({ columnVisibilityConversion: newState });
  },

  allColumnsConversion: [],
  setAllColumnsConversion: (columns) => set({ allColumnsConversion: columns }),

  columnOrderConversion: [],
  setColumnOrderConversion: (updater) => {
    const old = get().columnOrderConversion;
    const newOrder = typeof updater === "function" ? updater(old) : updater;
    set({ columnOrderConversion: newOrder });
  },

  columnPinningConversion: { left: [], right: [] },
  setColumnPinningConversion: (updater) => {
    const old = get().columnPinningConversion;
    const newState = typeof updater === "function" ? updater(old) : updater;
    set({ columnPinningConversion: newState });
  },

  // ---------------------------------------

  columnVisibilityFollower: {},
  setColumnVisibilityFollower: (updater) => {
    const old = get().columnVisibilityFollower;
    const newState = typeof updater === "function" ? updater(old) : updater;
    set({ columnVisibilityFollower: newState });
  },

  allColumnsFollower: [],
  setAllColumnsFollower: (columns) => set({ allColumnsFollower: columns }),

  columnOrderFollower: [],
  setColumnOrderFollower: (updater) => {
    const old = get().columnOrderFollower;
    const newOrder = typeof updater === "function" ? updater(old) : updater;
    set({ columnOrderFollower: newOrder });
  },

  columnPinningFollower: { left: [], right: [] },
  setColumnPinningFollower: (updater) => {
    const old = get().columnPinningFollower;
    const newState = typeof updater === "function" ? updater(old) : updater;
    set({ columnPinningFollower: newState });
  },
}));
