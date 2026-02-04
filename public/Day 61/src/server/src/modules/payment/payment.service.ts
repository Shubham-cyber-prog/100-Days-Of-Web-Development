import AppError from "@/shared/errors/AppError";
import { PaymentRepository } from "./payment.repository";

export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async getUserPayments(userId: string) {
    const payments = await this.paymentRepository.findPaymentsByUserId(userId);
    if (!payments || payments.length === 0) {
      throw new AppError(404, "No payments found for this user");
    }
    return payments;
  }

  async getPaymentDetails(paymentId: string, userId: string) {
    const payment = await this.paymentRepository.findPaymentById(paymentId);
    if (!payment) {
      throw new AppError(404, "Payment not found");
    }
    if (payment.userId !== userId) {
      throw new AppError(403, "You are not authorized to view this payment");
    }
    return payment;
  }

  async deletePayment(paymentId: string) {
    const payment = await this.paymentRepository.findPaymentById(paymentId);
    if (!payment) {
      throw new AppError(404, "Payment not found");
    }
    return this.paymentRepository.deletePayment(paymentId);
  }
}
