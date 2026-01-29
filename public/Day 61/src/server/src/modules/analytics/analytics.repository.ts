import { PrismaClient } from "@prisma/client";

export class AnalyticsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getOrderYearRange(): Promise<number[]> {
    const orders = await this.prisma.order.findMany({
      select: { orderDate: true },
      orderBy: { orderDate: "asc" },
    });
    const years = [
      ...new Set(orders.map((order) => order.orderDate.getFullYear())),
    ];
    return years;
  }

  async getOrdersByTimePeriod(
    start?: Date,
    end?: Date,
    yearStart?: Date,
    yearEnd?: Date
  ) {
    return this.prisma.order.findMany({
      where: {
        orderDate: {
          gte: start || yearStart,
          lte: end || yearEnd,
        },
      },
      include: { user: true },
    });
  }

  async getOrderItemsByTimePeriod(
    start?: Date,
    end?: Date,
    yearStart?: Date,
    yearEnd?: Date,
    category?: string
  ) {
    return this.prisma.orderItem.findMany({
      where: {
        createdAt: {
          gte: start || yearStart,
          lte: end || yearEnd,
        },
        ...(category && {
          product: {
            category: {
              name: category,
            },
          },
        }),
      },
      include: { variant: true },
    });
  }

  async getUsersByTimePeriod(
    start?: Date,
    end?: Date,
    yearStart?: Date,
    yearEnd?: Date
  ) {
    return this.prisma.user.findMany({
      where: {
        createdAt: {
          gte: start || yearStart,
          lte: end || yearEnd,
        },
      },
      include: { orders: true },
    });
  }
  async getInteractionsByTimePeriod(
    start?: Date,
    end?: Date,
    yearStart?: Date,
    yearEnd?: Date
  ) {
    return this.prisma.interaction.findMany({
      where: {
        createdAt: {
          gte: start || yearStart,
          lte: end || yearEnd,
        },
      },
      include: { user: true, product: true },
    });
  }
  async createInteraction(data: {
    userId?: string;
    sessionId?: string;
    productId?: string;
    type: string;
  }) {
    return this.prisma.interaction.create({
      data: {
        userId: data.userId,
        sessionId: data.sessionId,
        productId: data.productId,
        type: data.type,
      },
    });
  }
}
