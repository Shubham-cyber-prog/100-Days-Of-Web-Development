import { Router } from "express";
import { Server as SocketIOServer } from "socket.io";
import usersRoutes from "@/modules/user/user.routes";
import authRoutes from "@/modules/auth/auth.routes";
import productRoutes from "@/modules/product/product.routes";
import reviewRoutes from "@/modules/review/review.routes";
import categoryRoutes from "@/modules/category/category.routes";
import orderRoutes from "@/modules/order/order.routes";
import checkoutRoutes from "@/modules/checkout/checkout.routes";
import cartRoutes from "@/modules/cart/cart.routes";
import reportRoutes from "@/modules/reports/reports.routes";
import analyticsRoutes from "@/modules/analytics/analytics.routes";
import paymentRoutes from "@/modules/payment/payment.routes";
import addressRoutes from "@/modules/address/address.routes";
import shipmentRoutes from "@/modules/shipment/shipment.routes";
import transactionRoutes from "@/modules/transaction/transaction.routes";
import logRoutes from "@/modules/logs/logs.routes";
import sectionRoutes from "@/modules/section/section.routes";
import { configureChatRoutes } from "@/modules/chat/chat.routes";
import attributesRoutes from "@/modules/attribute/attribute.routes";
import variantsRoutes from '@/modules/variant/variant.routes'

export const configureV1Routes = (io: SocketIOServer) => {
  const router = Router();

  router.use("/users", usersRoutes);
  router.use("/auth", authRoutes);
  router.use("/products", productRoutes);
  router.use("/transactions", transactionRoutes);
  router.use("/reviews", reviewRoutes);
  router.use("/categories", categoryRoutes);
  router.use("/cart", cartRoutes);
  router.use("/checkout", checkoutRoutes);
  router.use("/reports", reportRoutes);
  router.use("/analytics", analyticsRoutes);
  router.use("/logs", logRoutes);
  router.use("/orders", orderRoutes);
  router.use("/shipment", shipmentRoutes);
  router.use("/payments", paymentRoutes);
  router.use("/addresses", addressRoutes);
  router.use("/sections", sectionRoutes);
  router.use("/attributes", attributesRoutes);
  router.use("/chat", configureChatRoutes(io));
  router.use('/variants', variantsRoutes)

  return router;
};
