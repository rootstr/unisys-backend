import z from "zod";

export const HttpProblemMessageSchema = z.object({
  type: z.string().url().optional(),
  status: z.number(),
  title: z.string(),
  detail: z.string(),
  instance: z.string().url().optional()
});

export type HttpProblemMessage = z.infer<typeof HttpProblemMessageSchema>;