import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";
import logger from "@/infra/winston/logger";
import { makeLogsService } from "@/modules/logs/logs.factory";

interface CustomError extends Error {
  name: string;
  code?: number | string;
  errors?: Record<string, { message: string }>;
  path?: string;
  value?: any;
  details?: { message: string }[];
  stack?: string;
}

const logsService = makeLogsService();

type ErrorHandler = (err: CustomError) => AppError;

const errorHandlers: Record<string | number, ErrorHandler> = {
  ValidationError: (err) =>
    new AppError(
      400,
      Object.values(err.errors || {})
        .map((val) => val.message)
        .join(", ")
    ),
  11000: () => new AppError(400, "Duplicate field value entered"),
  CastError: (err) => new AppError(400, `Invalid ${err.path}: ${err.value}`),
  TokenExpiredError: () =>
    new AppError(401, "Your session has expired, please login again."),
  Joi: (err) =>
    new AppError(
      400,
      (err.details || []).map((detail) => detail.message).join(", ")
    ),
  PrismaClientKnownRequestError: (err) => {
    switch (err.code) {
      case "P2002":
        return new AppError(400, "Duplicate field value entered");
      case "P2025":
        return new AppError(404, "Record not found");
      default:
        return new AppError(400, `Prisma error: ${err.message}`);
    }
  },
  PrismaClientValidationError: () =>
    new AppError(400, "Invalid input. Please check your request data."),
  PrismaClientInitializationError: () =>
    new AppError(500, "Database initialization error. Please try again later."),
  PrismaClientRustPanicError: () =>
    new AppError(
      500,
      "Unexpected internal server error. Please try again later."
    ),
};

const globalError = async (
  err: CustomError | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  let error: AppError =
    err instanceof AppError ? err : new AppError(500, err.message);

  const isDev = process.env.NODE_ENV === "development";
  const isProd = process.env.NODE_ENV === "production";

  const handler =
    errorHandlers[err.name] ||
    errorHandlers[err.constructor.name] ||
    ("code" in err ? errorHandlers[err.code || 500] : undefined);

  if (typeof handler === "function") {
    error = handler(err as CustomError);
  }

  // DEV logging
  if (isDev) {
    console.error("🔴 Error Message:", err.message);
    console.error("🔴 Error Name:", err.name);
    console.error(
      "🔴 Stack Trace:",
      err.stack?.split("\n").slice(0, 5).join("\n")
    );

    logger.error({
      message: error.message,
      statusCode: error.statusCode,
      method: req.method,
      path: req.originalUrl,
      stack: error.stack,
      ...(error.details && { details: error.details }),
    });
  }

  // PROD logging
  if (isProd && error.isOperational) {
    logger.error(
      `[${req.method}] ${req.originalUrl} - ${error.statusCode} - ${error.message}`
    );
  }

  const start = Date.now();
  const end = Date.now();

  // 🛠️ Logs Service Integration
  await logsService.error(`Error: ${error.message}`, {
    statusCode: error.statusCode,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    userId: (req as any)?.user?.id || null,
    timePeriod: end - start,
  });

  // 📤 Error Response
  res.status(error.statusCode || 500).json({
    status:
      error.statusCode >= 400 && error.statusCode < 500 ? "fail" : "error",
    message: error.message,
    ...(error.details && { errors: error.details }),
    ...(isDev && {
      stack: error.stack,
      error: error,
    }),
  });
};

export default globalError;
