import z from "zod";
import { UserPayloadSchema } from "./user.model";

export const AuthPayloadSchema = UserPayloadSchema.extend({});

export type AuthPayload = z.infer<typeof AuthPayloadSchema>;