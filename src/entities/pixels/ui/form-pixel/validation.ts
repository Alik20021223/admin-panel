import { z } from "zod";

// Схема для postBack
export const PixelSchema = z.object({
  namePixel: z.string().min(1, "Название пиксели"),
  enterPixel: z
    .string()
    .min(1, "Введите пиксель")
    .regex(/^\d{16}$/, "Пиксель должен содержать ровно 16 цифр"),
  apiKey: z.string().min(1, "API ключ обязателен"),
});

export const PixelFormSchema = z.object({
  pixels: z.array(PixelSchema),
});

// Автотип по схеме
export type CreateFormType = z.infer<typeof PixelFormSchema>;
