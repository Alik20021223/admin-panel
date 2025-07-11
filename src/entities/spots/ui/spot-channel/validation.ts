import { z } from "zod";

// Схема для кнопок
const buttonBotSchema = z.object({
  name: z.string().min(1, "Название кнопки обязательно"),
  url: z.string().min(1, "Ссылка обязательна"),
  id: z.number().optional(),
});

// Схема для outPostBack
const outPostBackSchema = z.object({
  event: z.string().min(1, "Событие обязательно"),
  id: z.string().min(1, "ID обязательно"),
  typeRequest: z.string().min(1, "Тип запроса обязателен"),
  linkToOutPostBack: z.string().min(1, "Ссылка обязательна"),
});

// Схема для postBack
export const postBackSchema = z
  .object({
    typePostBack: z.string().min(1, "Тип постбэка обязателен"),
    enterPixel: z.string().min(1, "Пиксель входа обязателен"),
    apiKey: z.string().min(1, "API ключ обязателен"),
    outPostBack: z.string().min(1, "Укажите, нужен ли исходящий постбэк"),
    outPostBackArray: z.array(outPostBackSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.outPostBack === "true" &&
      (!data.outPostBackArray || data.outPostBackArray.length === 0)
    ) {
      ctx.addIssue({
        path: ["outPostBackArray"],
        code: z.ZodIssueCode.custom,
        message: "Заполните хотя бы один исходящий постбэк",
      });
    }
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
