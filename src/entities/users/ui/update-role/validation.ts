import { z } from "zod";

export const UserFormSchema = z.object({
  role: z.string(),
});

// Автотип по схеме
export type UpdateFormType = z.infer<typeof UserFormSchema>;
