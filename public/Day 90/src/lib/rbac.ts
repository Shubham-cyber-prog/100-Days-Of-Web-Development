import { Role } from "@prisma/client";

export function canAccess(
  userRole: Role,
  allowedRoles: Role[]
): boolean {
  return allowedRoles.includes(userRole);
}
