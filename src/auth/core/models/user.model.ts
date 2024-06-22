import z from "zod";

export const UserSchema = z.object({
  userId: z.string().nanoid(),
  username: z.string().nanoid(),
  name: z.string(),
  lastName: z.string()
});

export const UserPayloadSchema = UserSchema.omit({
  name: true,
  lastName: true
});

export type User = z.infer<typeof UserSchema>;
export type UserPayload = z.infer<typeof UserPayloadSchema>