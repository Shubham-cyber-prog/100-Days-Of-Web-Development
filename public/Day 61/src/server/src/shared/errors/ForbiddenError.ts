import AppError from "./AppError";

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export default ForbiddenError;
