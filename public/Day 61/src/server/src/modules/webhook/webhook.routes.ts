import express from "express";
import bodyParser from "body-parser";
import { makeWebhookController } from "./webhook.factory";

const router = express.Router();
const webhookController = makeWebhookController();

/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Handle webhook events
 *     description: Receives and processes incoming webhook events.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *         description: Webhook processed successfully.
 *       400:
 *         description: Invalid webhook payload.
 */
router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  webhookController.handleWebhook
);

export default router;
