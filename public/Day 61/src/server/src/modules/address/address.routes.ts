import express from "express";
import protect from "@/shared/middlewares/protect";
import { makeAddressController } from "./address.factory";

const router = express.Router();
const addressController = makeAddressController();

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get all user addresses
 *     description: Retrieves a list of all addresses associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user addresses.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.get("/", protect, addressController.getUserAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Get address details
 *     description: Retrieves detailed information about a specific address for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the address to retrieve.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The details of the specified address.
 *       404:
 *         description: Address not found.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.get("/:id", protect, addressController.getAddressDetails);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     description: Deletes the specified address for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the address to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Address successfully deleted.
 *       404:
 *         description: Address not found.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.delete("/:id", protect, addressController.deleteAddress);

export default router;
