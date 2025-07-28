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



// Основная схема
export const StepOneSpotSchema = z.object({
  idChannel: z.string().min(1, "Введите ID канала"),
  tokenBot: z.string().min(1, "Введите токен бота"),
  autoReception: z.boolean(),
  HelloSelect: z.boolean(),
  textHello: z.string(),
  mediaHello: z.custom<File>().nullable(),
  buttonsTypeHello: z.array(buttonBotSchema),
  title: z.string().optional(),
});
