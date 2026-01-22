import { PrismaClient } from "@prisma/client";

export class ReportsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createReport(data: {
    type: string;
    format: string;
    userId: string;
    parameters: any;
    filePath: string | null;
  }) {
    return this.prisma.report.create({
      data: {
        type: data.type,
        format: data.format,
        userId: data.userId,
        parameters: data.parameters,
        filePath: data.filePath,
        createdAt: new Date(),
      },
    });
  }
}
