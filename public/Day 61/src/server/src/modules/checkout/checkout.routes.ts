import express from "express";
import protect from "@/shared/middlewares/protect";
import { makeCheckoutController } from "./checkout.factory";

const router = express.Router();
const checkoutController = makeCheckoutController();

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Initiate checkout
 *     description: Initiates the checkout process for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   addressLine1:
 *                     type: string
 *                   addressLine2:
 *                     type: string
 *                   city:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *     responses:
 *       200:
 *         description: Checkout successfully initiated.
 *       400:
 *         description: Invalid input data or missing required fields.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.post("/", protect, checkoutController.initiateCheckout);

export default router;
