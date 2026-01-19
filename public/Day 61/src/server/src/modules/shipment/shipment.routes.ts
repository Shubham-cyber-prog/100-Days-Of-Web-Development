import express from "express";
import { makeShipmentController } from "./shipment.factory";
import optionalAuth from "@/shared/middlewares/optionalAuth";

const router = express.Router();
const shipmentController = makeShipmentController();

/**
 * @swagger
 * /shipments:
 *   post:
 *     summary: Create a new shipment
 *     description: Creates a new shipment. Authentication is optional.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *                 description: The destination address for the shipment.
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: List of items to be shipped.
 *               shippingMethod:
 *                 type: string
 *                 description: The shipping method used for the shipment.
 *     responses:
 *       201:
 *         description: Shipment created successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.post("/", optionalAuth, shipmentController.createShipment);

export default router;
