import { AuthError, Session, User } from "@supabase/supabase-js";

export interface UserStructure {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponseStructure {
  data: { user: User | null; session: Session | null };
  error: AuthError | null;
}

export interface ErrorAuthMessage {
  message: string | unknown;
}
