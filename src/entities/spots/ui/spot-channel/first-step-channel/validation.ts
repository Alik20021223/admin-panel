import { z } from "zod";

export const StepOneSpotSchema = z.object({
  idChannel: z.string().min(1, "Введите ID канала"),
  tokenBot: z.string().min(1, "Введите токен бота"),
});
