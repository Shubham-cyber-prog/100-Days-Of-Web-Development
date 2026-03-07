import express from "express";
import protect from "@/shared/middlewares/protect";
import { makePaymentController } from "./payment.factory";

const router = express.Router();
const paymentController = makePaymentController();

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get user's payments
 *     description: Retrieves a list of all payments made by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of payments.
 */
router.get("/", protect, paymentController.getUserPayments);

/**
 * @swagger
 * /payments/{paymentId}:
 *   get:
 *     summary: Get payment details by ID
 *     description: Retrieves details of a specific payment by its ID.
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to retrieve.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment details.
 *       404:
 *         description: Payment not found.
 */
router.get("/:paymentId", protect, paymentController.getPaymentDetails);

/**
 * @swagger
 * /payments/{paymentId}:
 *   delete:
 *     summary: Delete payment by ID
 *     description: Deletes a specific payment by its ID.
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment deleted successfully.
 *       404:
 *         description: Payment not found.
 */
router.delete("/:paymentId", protect, paymentController.deletePayment);

export default router;
