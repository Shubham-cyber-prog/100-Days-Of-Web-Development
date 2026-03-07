import AppError from "@/shared/errors/AppError";
import { OrderRepository } from "./order.repository";
import prisma from "@/infra/database/database.config";

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getAllOrders() {
    const orders = await this.orderRepository.findAllOrders();
    if (!orders || orders.length === 0) {
      throw new AppError(404, "No orders found");
    }
    return orders;
  }

  async getUserOrders(userId: string) {
    const orders = await this.orderRepository.findOrdersByUserId(userId);
    if (!orders || orders.length === 0) {
      throw new AppError(404, "No orders found for this user");
    }
    return orders;
  }

  async getOrderDetails(orderId: string, userId: string) {
    const order = await this.orderRepository.findOrderById(orderId);
    if (!order) {
      throw new AppError(404, "Order not found");
    }
    if (order.userId !== userId) {
      throw new AppError(403, "You are not authorized to view this order");
    }
    return order;
  }

  async createOrderFromCart(userId: string, cartId: string) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: { include: { variant: { include: { product: true } } } } },
    });
    if (!cart || cart.cartItems.length === 0) {
      throw new AppError(400, "Cart is empty or not found");
    }
    if (cart.userId !== userId) {
      throw new AppError(403, "You are not authorized to access this cart");
    }

    const amount = cart.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.variant.price,
      0
    );

    const orderItems = cart.cartItems.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
      price: item.variant.price,
    }));

    return this.orderRepository.createOrder({
      userId,
      amount,
      orderItems,
    });
  }
}