// src/types/auth.ts
import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
