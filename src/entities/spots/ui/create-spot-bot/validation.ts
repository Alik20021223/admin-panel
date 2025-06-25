import { z } from "zod";

export const BotSpotBotSchema = z.object({
  shortName: z.string().min(1, "Короткое имя обязательно"),
  linkToWebhook: z.string().min(1, "Ссылка для Webhook обязательна"),
});

export const defaultGeneralSchema = z.object({
  generalText: z.string().min(1, "Название обязательно"),
});

const outPostBackSchema = z.object({
  event: z.string().min(1, "Событие обязательно"),
  id: z.string().min(1, "ID обязателен"),
  typeRequest: z.string().min(1, "Тип запроса обязателен"),
  linkToOutPostBack: z.string().url("Некорректный URL"),
});

const postBackSchema = z.object({
  typePostBack: z.string().min(1, "Тип PostBack обязателен"),
  enterPixel: z.string().min(1, "Enter Pixel обязателен"),
  apiKey: z.string().min(1, "API Key обязателен"),
  outPostBack: z.string().url("Некорректный URL для outPostBack"),

  outPostBackArray: z.array(outPostBackSchema),
});

export const appSpotPostBackSchema = z.object({
  postBack: z.array(postBackSchema),
});

