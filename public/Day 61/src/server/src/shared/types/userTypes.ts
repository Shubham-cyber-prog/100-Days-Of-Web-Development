export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPERADMIN = "SUPERADMIN",
}

export interface User {
  id: string;
  role: Role;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  avatar?: string | null;
}
