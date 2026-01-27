import { PrismaClient, ROLE } from "@prisma/client";
import { buildDateFilter } from ".";

export const fetchData = async <T>(
  prisma: PrismaClient,
  model: keyof PrismaClient,
  dateField: string,
  startDate?: Date,
  endDate?: Date,
  yearStart?: Date,
  yearEnd?: Date,
  role?: ROLE,
  include?: Record<string, boolean>
): Promise<T[]> => {
  const where: any = {
    [dateField]: buildDateFilter(startDate, endDate, yearStart, yearEnd),
  };
  if (role) where.role = role;
  return (prisma[model] as any).findMany({ where, include }) as Promise<T[]>;
};
