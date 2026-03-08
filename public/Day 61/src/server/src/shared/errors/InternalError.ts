import AppError from "./AppError";

class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(500, message, false);
  }
}

export default InternalServerError;
