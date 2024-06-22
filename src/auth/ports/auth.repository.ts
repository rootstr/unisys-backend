import { AuthSession } from "@/auth/core/models/authSession.model";

export interface AuthRepository<T extends AuthSession> {
  getAllSessions(): Promise<T [] | null>;
}