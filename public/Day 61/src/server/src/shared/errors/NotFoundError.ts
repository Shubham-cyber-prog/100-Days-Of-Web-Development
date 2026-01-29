import AppError from "./AppError";

class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(404, `${resource} not found`);
  }
}

export default NotFoundError;
