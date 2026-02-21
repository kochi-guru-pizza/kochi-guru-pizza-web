// src/types/user.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  authProvider: "local" | "google" | "both";
  googleId?: string;
  role: "admin" | "staff" | "customer";
  phone?: string;
  profilePicture?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
