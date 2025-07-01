import { z } from "zod";

export const defaultGeneralSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  domen: z.string().min(1, "Домен обязателен"),
  autoRedirect: z.string().min(1, "Авторедирект обязателен"),
  spot: z.string().min(1, "Спот обязателен"),
  showToCountry: z.array(z.string()).min(1, "Выберите хотя бы одну страну"),
});

export const expertDesignSchema = z.object({
  colorBgBanner: z.string().min(1, "Цвет фона баннера обязателен"),
  bgColor: z.string().min(1, "Цвет фона обязателен"),
  accentColor: z.string().min(1, "Акцентный цвет обязателен"),
  logo: z.custom<File>().nullable(),
  patternBg: z.custom<File>().nullable(),
  avatar: z.custom<File>().nullable(), // по умолчанию опциональные
});

export const expertGeneralSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  title: z.string().min(1, "Заголовок обязателен"),
  // whitePage: z.string().min(1, "White page обязателен"),
  description: z.string().min(1, "Описание обязательно"),
  domen: z.string().min(1, "Домен обязателен"),
  autoRedirect: z.string().min(1, "Авторедирект обязателен"),
  spot: z.string().min(1, "Спот обязателен"),
  countUsers: z.string().min(1, "Количество участников обязательно"),
  showToCountry: z.array(z.string()).min(1, "Выберите хотя бы одну страну"),
});

export const expertTranslateSchema = z.object({
  textDownload: z.string().min(1, "Ввод обязтелен"),
  textViewTelegram: z.string().min(1, "Ввод обязтелен"),
  textMembers: z.string().min(1, "Ввод обязтелен"),
});
