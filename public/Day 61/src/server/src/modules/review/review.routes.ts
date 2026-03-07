import { Router } from "express";
import { makeReviewController } from "./review.factory";
import protect from "@/shared/middlewares/protect";

const router = Router();
const controller = makeReviewController();

/**
 * @swagger
 * /reviews/{productId}:
 *   get:
 *     summary: Get reviews by product ID
 *     description: Retrieves reviews for a specific product using its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve reviews for.
 *     responses:
 *       200:
 *         description: A list of reviews for the product.
 *       404:
 *         description: Product not found.
 */
router.get("/:productId", controller.getReviewsByProductId);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     description: Allows authenticated users to submit a new review.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.post("/", protect, controller.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete review by ID
 *     description: Deletes a specific review by its ID (Admin or reviewer only).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       404:
 *         description: Review not found.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.delete("/:id", protect, controller.deleteReview);

export default router;
