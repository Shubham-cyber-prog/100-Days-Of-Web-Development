import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { WebhookService } from "./webhook.service";
import { makeLogsService } from "../logs/logs.factory";
import stripe from "@/infra/payment/stripe";
import AppError from "@/shared/errors/AppError";

export class WebhookController {
  private logsService = makeLogsService();
  constructor(private webhookService: WebhookService) {}

  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) throw new AppError(400, "No Stripe signature");

    let event;
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { order, payment, shipment, address } =
        await this.webhookService.handleCheckoutCompletion(session);
    }

    sendResponse(res, 200, { message: "Webhook received successfully" });
  });
}