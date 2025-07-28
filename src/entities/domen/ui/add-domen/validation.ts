import { z } from "zod";

// Основная схема формы
export const EditFormSchema = z.object({
  url: z.string().min(1, "Название обязательно"),
});

// Автотип по схеме
export type EditFormType = z.infer<typeof EditFormSchema>;
