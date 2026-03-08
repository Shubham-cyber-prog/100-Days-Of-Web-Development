import { Request, Response, NextFunction } from "express";
import { makeLogsService } from "@/modules/logs/logs.factory";

const logsService = makeLogsService();

export const logRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const { method, url, ip } = req;

  res.on("finish", async () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const userId = req.user?.id || "anonymous";

    await logsService.info(`API Request`, {
      method,
      url,
      status,
      timePeriod: duration,
      ip,
      userId,
    });
  });

  next();
};
