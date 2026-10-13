export type UserRole = "admin" | "staff";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};