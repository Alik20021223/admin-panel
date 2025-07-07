import { ButtonBotType, SpotType } from "@shared/types";
import { ReactNode } from "react";

export type TableRow = {
  id: string;
  mailing_name: string;
  mailing_type: string;
  status: string;
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
  daysOfWeek: string[];
};

export type MailingItem = {
  id: string; // Уникальный идентификатор рассылки
  user_email: string; // Email пользователя, создавшего рассылку
  mailing_name: string; // Название рассылки
  mailing_type: MailingType; // Тип рассылки
  status: "pending" | "sending" | "sent" | "failed"; // Текущий статус рассылки
};

export type GetDataFormMailingForm = {
  channels: SpotType[];
  mailing_types: ["permanent", "disposable"];
};

export interface MailingResponse {
  current_mailing: CurrentMailing;
  available_spots: SpotType[];
  mailing_types: MailingType[];
}

export interface CurrentMailing {
  id: string;
  mailing_name: string;
  mailing_type: MailingType;
  text: string;
  spots: number[];
  scheduled_at: string; // ISO string (RFC3339)
  days_of_week: DayOfWeek[];
  status: MailingStatus;
}

export type MailingType = "permanent" | "disposable";

export type MailingStatus = "pending" | "sending" | "sent" | "failed";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
