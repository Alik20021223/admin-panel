import { ButtonBotType } from "@shared/types";
import { ReactNode } from "react";

export type TableRow = {
  id: number;
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

export type MailingItem = {
  id: string; // Уникальный идентификатор рассылки
  user_email: string; // Email пользователя, создавшего рассылку
  mailing_name: string; // Название рассылки
  mailing_type: "permanent" | "disposable"; // Тип рассылки
  status: "pending" | "sending" | "sent" | "failed"; // Текущий статус рассылки
};

export type CreateMailingType = {
  mailing_name: string;
  mailing_type: "permanent" | "disposable";
  text: string;
  channels?: string;
  date_and_time: string;
  image: string;
  buttons: {
    text: string,
    url: string
  }[]
};
