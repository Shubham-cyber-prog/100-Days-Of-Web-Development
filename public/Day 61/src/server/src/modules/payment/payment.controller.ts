import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import AppError from "@/shared/errors/AppError";
import { PaymentService } from "./payment.service";
import { makeLogsService } from "../logs/logs.factory";

export class PaymentController {
  private logsService = makeLogsService();
  constructor(private paymentService: PaymentService) {}

  getUserPayments = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(400, "User not found");
    }
    const payments = await this.paymentService.getUserPayments(userId);
    sendResponse(res, 200, {
      data: payments,
      message: "Payments retrieved successfully",
    });
  });

  getPaymentDetails = asyncHandler(async (req: Request, res: Response) => {
    const { paymentId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(400, "User not found");
    }
    const payment = await this.paymentService.getPaymentDetails(
      paymentId,
      userId
    );
    sendResponse(res, 200, {
      data: payment,
      message: "Payment retrieved successfully",
    });
  });

  deletePayment = asyncHandler(async (req: Request, res: Response) => {
    const { paymentId } = req.params;
    await this.paymentService.deletePayment(paymentId);
    sendResponse(res, 200, { message: "Payment deleted successfully" });
    const start = Date.now();
    const end = Date.now();

    this.logsService.info("Payment deleted", {
      userId: req.user?.id,
      sessionId: req.session.id,
      timePeriod: end - start,
    });
  });
}
