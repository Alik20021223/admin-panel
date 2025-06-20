import { ButtonBotType } from "@shared/types";
import { ReactNode } from "react";

export type TableRow = {
  id: number | string;
  name: string;
  type: string;
  status: string;
  message_count: number;
  author: string;
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



export type EditFormType = {
  name: string;
  typeMailing: string;
  spot: string[];
  dateAndTime: Date;
  text: string;
  media: File | null;
  buttonsType: ButtonBotType[];
  time: string;
};

