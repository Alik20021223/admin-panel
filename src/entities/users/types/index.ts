import { UserType } from "@shared/types";
import { ReactNode } from "react";

export type TableRow = {
  ID: number;
  name: string;
  last_name: string;
  phone: string;
  messenger: string;
  email: string;
  role: string;
  actions?: ReactNode; // для отображения React-компонентов в колонке "Действия"
};

export type UserResponse = {
  user: UserType;
  user_list: UserItem[];
};

export type UpdateRole = {
  role: string;
};

export type UserItem = {
  ID: number;
  name: string;
  last_name: string;
  phone: string;
  messenger: string;
  email: string;
  role: string;
};
