import { ReactNode } from "react";

export type TableRow = {
  ID: string;
  url: string;
  status: string;
  actions?: ReactNode; // для отображения React-компонентов в колонке "Действия"
};

export type ColumnConfig = {
  id: string;
  isVisible: boolean;
  isPinned: boolean;
};

export type FormType = {
  search: string;
  status: string;
  typeMailing: string;
  spot: string;
};

export type DomainResponse = {
  domains: TableRow[];
};

export type DomainType = {
  ID: number;
  status: string;
  url: string;
};

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
