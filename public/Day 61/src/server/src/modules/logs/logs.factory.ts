import { LogsController } from "./logs.controller";
import { LogsRepository } from "./logs.repository";
import { LogsService } from "./logs.service";

export const makeLogsController = () => {
  const logsRepo = new LogsRepository();
  const service = new LogsService(logsRepo);
  const controller = new LogsController(service);
  return controller;
};

export const makeLogsService = () => {
  const logsRepo = new LogsRepository();
  const service = new LogsService(logsRepo);
  return service;
};
