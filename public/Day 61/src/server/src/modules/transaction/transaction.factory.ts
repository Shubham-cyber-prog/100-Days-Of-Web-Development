import { TransactionController } from "./transaction.controller";
import { TransactionRepository } from "./transaction.repository";
import { TransactionService } from "./transaction.service";

export const makeTransactionController = () => {
  const repo = new TransactionRepository();
  const service = new TransactionService(repo);
  const controller = new TransactionController(service);
  return controller;
};
