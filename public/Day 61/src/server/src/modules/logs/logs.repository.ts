import { LogEntry } from "./logs.types";
import prisma from "@/infra/database/database.config";

export class LogsRepository {

  constructor() {
  }

  async getLogs() {

    return prisma.log.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
    });
  }

  async getLogById(id: string) {
    return prisma.log.findUnique({
      where: { id },
    });
  }
  async getLogsByLevel(level: string) {
    return prisma.log.findMany({
      where: { level },
    });
  }

  async deleteLog(id: string) {
    return prisma.log.delete({
      where: { id },
    });
  }

  async clearLogs() {
    return prisma.log.deleteMany();
  }

  async createLog(data: LogEntry) {
    return prisma.log.create({
      data: {
        level: data.level,
        message: data.message,
        context: data.context,
      },
    });
  }
}
