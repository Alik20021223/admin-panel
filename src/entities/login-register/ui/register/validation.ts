import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email("Неверный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});
