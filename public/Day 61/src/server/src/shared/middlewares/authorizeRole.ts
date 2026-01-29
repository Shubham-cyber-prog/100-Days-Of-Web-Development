import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import prisma from "@/infra/database/database.config";

const authorizeRole = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.id) {
        return next(new AppError(401, "Unauthorized: No user found"));
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { role: true },
      });

      if (!user) {
        return next(new AppError(401, "Unauthorized: User not found"));
      }

      if (!allowedRoles.includes(user.role)) {
        return next(
          new AppError(403, "You are not authorized to perform this action")
        );
      }

      next();
    } catch (error) {
      return next(new AppError(500, "Internal server error"));
    }
  };
};

export default authorizeRole;
