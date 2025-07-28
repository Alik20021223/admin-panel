import { ReactNode } from "react";

export type TableRow = {
  id: number;
  name: string;
  pixel_id: string;
  access_token: string;
  actions?: ReactNode; // для отображения React-компонентов в колонке "Действия"
};

export type pixelsResponse = {
  pixels: TableRow[];
};

export type pixelTypePost = {
  pixels: pixelItem[];
};

export type pixelItem = {
  name: string;
  pixel_id: number;
  access_token: string;
};
