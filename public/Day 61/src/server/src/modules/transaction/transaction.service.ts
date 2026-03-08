import { makeLogsService } from "../logs/logs.factory";
import { TransactionRepository } from "./transaction.repository";
import { TRANSACTION_STATUS } from "@prisma/client";

export class TransactionService {
  private logsService = makeLogsService();
  constructor(private transactionRepository: TransactionRepository) { }

  async getAllTransactions() {
    const transactions = await this.transactionRepository.findMany();

    return transactions;
  }

  async getTransactionById(id: string) {
    const transaction = await this.transactionRepository.findById(id);
    return transaction;
  }
  async updateTransactionStatus(
    id: string,
    data: { status: TRANSACTION_STATUS }
  ) {
    const transaction = await this.transactionRepository.updateTransaction(
      id,
      data
    );

    return transaction;
  }
  async deleteTransaction(id: string) {
    await this.transactionRepository.deleteTransaction(id);
  }
}
