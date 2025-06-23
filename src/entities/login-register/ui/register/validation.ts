import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Невалидный email"),
    password: z.string().min(6, "Минимум 6 символов"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Пароли не совпадают",
  });
