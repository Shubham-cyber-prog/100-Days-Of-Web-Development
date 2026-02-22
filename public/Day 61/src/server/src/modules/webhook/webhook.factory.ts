import { WebhookService } from "./webhook.service";
import { WebhookController } from "./webhook.controller";
import { ProductRepository } from "../product/product.repository";
import { ShipmentRepository } from "../shipment/shipment.repository";
import { PaymentRepository } from "../payment/payment.repository";
import { OrderRepository } from "../order/order.repository";
import { AddressRepository } from "../address/address.repository";
import { CartRepository } from "../cart/cart.repository";
import { TransactionRepository } from "../transaction/transaction.repository";

export const makeWebhookController = () => {
  const productRepo = new ProductRepository();
  const shipmentRepo = new ShipmentRepository();
  const paymentRepo = new PaymentRepository();
  const orderRepo = new OrderRepository();
  const addressRepo = new AddressRepository();
  const cartRepo = new CartRepository();
  const transactionRepo = new TransactionRepository();

  const webhookService = new WebhookService();
  return new WebhookController(webhookService);
};
