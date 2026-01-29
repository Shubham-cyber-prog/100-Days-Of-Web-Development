import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import AppError from "../errors/AppError";
import logger from "@/infra/winston/logger";

export function validateDto(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));

      logger.error("Validation errors:", formattedErrors);
      return next(
        new AppError(400, "Validation failed", true, formattedErrors)
      );
    }

    req.body = dtoObj;
    next();
  };
}
