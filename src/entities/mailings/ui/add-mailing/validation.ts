import { z } from "zod";

// Константа типов рассылки
export const mailing_types = ["permanent", "disposable"] as const;
export type MailingType = (typeof mailing_types)[number];

// Схема кнопки
export const buttonBotSchema = z.object({
  name: z.string().min(1, "Название кнопки обязательно"),
  url: z
    .string()
    .min(1, "Ссылка обязательна")
    .url("Введите корректную ссылку (например, https://example.com)"),
  id: z.number().optional(),
});

// Основная схема формы
export const EditFormSchema = z
  .object({
    name: z.string().min(1, "Название обязательно"),
    typeMailing: z.enum(mailing_types, {
      errorMap: () => ({ message: "Неверный тип рассылки" }),
    }),
    dateAndTime: z.date().nullable().optional(),
    time: z.string().nullable().optional(),
    spot: z.array(z.string()).min(1, "Выберите хотя бы один спот"),
    text: z.string().min(1, "Текст обязателен"),
    media: z.any().nullable(),
    buttonsType: z.array(buttonBotSchema),
    daysOfWeek: z.array(z.string()).optional(), // ← всё ещё optional
  })
  .superRefine((data, ctx) => {
    const isPermanent = data.typeMailing === "permanent";
    const isDisposable = data.typeMailing === "disposable";

    if (isPermanent) {
      if (!data.daysOfWeek || data.daysOfWeek.length === 0) {
        ctx.addIssue({
          path: ["daysOfWeek"],
          code: z.ZodIssueCode.custom,
          message: "Выберите хотя бы один день недели для постоянной рассылки",
        });
      }
      if (!data.time || data.time.trim() === "") {
        ctx.addIssue({
          path: ["time"],
          code: z.ZodIssueCode.custom,
          message: "Время обязательно для постоянной рассылки",
        });
      }
    }

    if (isDisposable) {
      if (!data.dateAndTime) {
        ctx.addIssue({
          path: ["dateAndTime"],
          code: z.ZodIssueCode.custom,
          message: "Дата и время обязательны для одноразовой рассылки",
        });
      }
      if (!data.time || data.time.trim() === "") {
        ctx.addIssue({
          path: ["time"],
          code: z.ZodIssueCode.custom,
          message: "Время обязательно для одноразовой рассылки",
        });
      }
    }
  });

// Автотип по схеме
export type EditFormType = z.infer<typeof EditFormSchema>;
export type ButtonBotType = z.infer<typeof buttonBotSchema>;
