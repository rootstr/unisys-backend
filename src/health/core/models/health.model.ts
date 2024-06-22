import { z } from "zod";

export const HealthResponseSchema = z.object({
  message: z.string(),
  date: z.date()
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;