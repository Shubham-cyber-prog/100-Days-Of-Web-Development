import asyncHandler from "@/shared/utils/asyncHandler";
import { LogsService } from "./logs.service";
import sendResponse from "@/shared/utils/sendResponse";
import { Request, Response } from "express";

export class LogsController {
  constructor(private logsService: LogsService) {}

  getLogs = asyncHandler(async (req: Request, res: Response) => {
    const logs = await this.logsService.getLogs();
    sendResponse(res, 200, {
      message: "Logs fetched successfully",
      data: { logs },
    });
  });

  getLogByLevel = asyncHandler(async (req: Request, res: Response) => {
    const { level } = req.params;
    const logs = await this.logsService.getLogByLevel(level);
    sendResponse(res, 200, {
      message: "Logs fetched successfully",
      data: { logs },
    });
  });

  getLogById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const log = await this.logsService.getLogById(id);
    sendResponse(res, 200, {
      message: "Log fetched successfully",
      data: { log },
    });
  });

  deleteLog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.logsService.deleteLog(id);
    sendResponse(res, 200, {
      message: "Log deleted successfully",
    });
  });

  clearLogs = asyncHandler(async (req: Request, res: Response) => {
    await this.logsService.clearLogs();
    sendResponse(res, 200, {
      message: "Logs cleared successfully",
    });
  });
}
