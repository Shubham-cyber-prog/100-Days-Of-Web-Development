import prisma from "@/infra/database/database.config";
import { PAYMENT_STATUS } from "@prisma/client";

export class PaymentRepository {
  async createPayment(data: {
    orderId: string;
    userId: string;
    method: string;
    amount: number;
    status: PAYMENT_STATUS;
  }) {
    return prisma.payment.create({
      data: {
        orderId: data.orderId,
        userId: data.userId,
        method: data.method,
        amount: data.amount,
        status: data.status,
      },
    });
  }
  async findPaymentsByUserId(userId: string) {
    return prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findPaymentById(paymentId: string) {
    return prisma.payment.findUnique({
      where: { id: paymentId },
    });
  }

  async deletePayment(paymentId: string) {
    return prisma.payment.delete({
      where: { id: paymentId },
    });
  }
}
