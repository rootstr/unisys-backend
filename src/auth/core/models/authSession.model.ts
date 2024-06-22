import z from "zod";

export const AuthSessionSchema = z.object({
  sessionToken: z.string(),
  iat: z.string(),
  exp: z.string()
});

export type AuthSession = z.infer<typeof AuthSessionSchema>;