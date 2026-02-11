import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import AppError from "@/shared/errors/AppError";
import { makeLogsService } from "../logs/logs.factory";
import { TransactionService } from "./transaction.service";
import sendResponse from "@/shared/utils/sendResponse";

export class TransactionController {
  private logsService = makeLogsService();
  constructor(private transactionService: TransactionService) { }

  getAllTransactions = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await this.transactionService.getAllTransactions();

    sendResponse(res, 200, {
      data: { transactions },
      message: "Fetched transactions successfully",
    });
  });
  getTransactionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const transaction = await this.transactionService.getTransactionById(id);

    sendResponse(res, 200, {
      data: { transaction },
      message: "Fetched transaction successfully",
    });
  });
  updateTransactionStatus = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { status } = req.body;
      console.log("status => ", status);

      const updatedTransaction =
        await this.transactionService.updateTransactionStatus(id, { status });

      sendResponse(res, 200, {
        data: { updatedTransaction },
        message: "Updated transaction successfully",
      });
    }
  );

  deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.transactionService.deleteTransaction(id);
    sendResponse(res, 204, { message: "Deleted transaction successfully" });
  });
}
