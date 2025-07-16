import { z } from "zod";

// Схема для кнопок
const buttonBotSchema = z.object({
  name: z.string().min(1, "Название кнопки обязательно"),
  url: z
    .string()
    .min(1, "Ссылка обязательна")
    .url("Введите корректную ссылку (например, https://example.com)"),
  id: z.number().optional(),
});

// Схема для postBack
export const postBackSchema = z.object({
  typePostBack: z.string().min(1, "Тип постбэка обязателен"),
  enterPixel: z
    .string()
    .min(1, "Введите пиксель")
    .regex(/^\d+$/, "Пиксель должен содержать только цифры"),

  apiKey: z.string().min(1, "API ключ обязателен"),
});

// Основная схема
export const StepOneSpotSchema = z.object({
  idChannel: z.string().min(1, "Введите ID канала"),
  tokenBot: z.string().min(1, "Введите токен бота"),
  autoReception: z.boolean(),
  HelloSelect: z.boolean(),
  textHello: z.string(),
  mediaHello: z.custom<File>().nullable(),
  buttonsTypeHello: z.array(buttonBotSchema),
  postBack: z.array(postBackSchema),
});
