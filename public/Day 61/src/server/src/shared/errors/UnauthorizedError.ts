import AppError from "./AppError";

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export default UnauthorizedError;
