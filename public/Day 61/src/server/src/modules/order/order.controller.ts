import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import AppError from "@/shared/errors/AppError";
import { OrderService } from "./order.service";

export class OrderController {
  constructor(private orderService: OrderService) {}

  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await this.orderService.getAllOrders();
    sendResponse(res, 200, {
      data: { orders },
      message: "Orders retrieved successfully",
    });
  });

  getUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(400, "User not found");
    }
    const orders = await this.orderService.getUserOrders(userId);
    sendResponse(res, 200, {
      data: { orders },
      message: "Orders retrieved successfully",
    });
  });

  getOrderDetails = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(400, "User not found");
    }
    const order = await this.orderService.getOrderDetails(orderId, userId);
    sendResponse(res, 200, {
      data: { order },
      message: "Order details retrieved successfully",
    });
  });

  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { cartId } = req.body;
    if (!userId) {
      throw new AppError(400, "User not found");
    }
    if (!cartId) {
      throw new AppError(400, "Cart ID is required");
    }
    const order = await this.orderService.createOrderFromCart(userId, cartId);
    sendResponse(res, 201, {
      data: { order },
      message: "Order created successfully",
    });
  });
}