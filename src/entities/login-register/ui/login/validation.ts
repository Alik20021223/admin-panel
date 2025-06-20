import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Неверный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});
