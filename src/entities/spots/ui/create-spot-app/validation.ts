import { z } from "zod";

const buttonBotSchema = z.object({
  name: z.string().min(1, "Название кнопки обязательно"),
  link: z.string().url("Ссылка кнопки должна быть валидным URL"),
  id: z.number().int(),
});

const commandConditionSchema = z.object({
  commandCondition: z.string().min(1, "Команда обязательна"),
  textCommand: z.string().min(1, "Текст команды обязателен"),
  descriptionCommand: z.string().min(1, "Описание команды обязательно"),
  buttonsTypeCommand: z.array(buttonBotSchema).optional(),
  mediaCommand: z.instanceof(File).nullable().or(z.literal(null)).optional(),
});

export const appSpotBotSchema = z.object({
  botToken: z.string().min(1, "Токен бота обязателен"),
  userName: z.string().min(1, "Имя пользователя обязательно"),
  linkToApp: z.string().url("Ссылка на приложение должна быть валидным URL"),
  linkToName: z.string().min(1, "Название ссылки обязательно"),
  HelloSelect: z.string().min(1, "Выбор приветствия обязателен"),
  textHello: z.string().optional(),
  mediaHello: z.instanceof(File).nullable().or(z.literal(null)).optional(),
  buttonsTypeHello: z.array(buttonBotSchema).optional(),
  command: z.array(commandConditionSchema).optional(),
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

export type AppSpotBotSchemaType = z.infer<typeof appSpotBotSchema>;
