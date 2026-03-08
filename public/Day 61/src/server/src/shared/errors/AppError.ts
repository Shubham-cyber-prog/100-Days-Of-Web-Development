export type ErrorDetail = {
  property: string;
  constraints?: Record<string, string>;
};

class AppError extends Error {
  public statusCode: number;
  public success: boolean;
  public isOperational: boolean;
  public details?: ErrorDetail[];

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    details?: ErrorDetail[]
  ) {
    if (typeof statusCode !== "number")
      throw new Error("statusCode must be a number");
    if (typeof message !== "string")
      throw new Error("message must be a string");

    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
