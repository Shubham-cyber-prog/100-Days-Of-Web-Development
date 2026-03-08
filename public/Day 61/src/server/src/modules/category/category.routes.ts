import express from "express";
import protect from "@/shared/middlewares/protect";
import authorizeRole from "@/shared/middlewares/authorizeRole";
import { makeCategoryController } from "./category.factory";
import upload from "@/shared/middlewares/upload";

const router = express.Router();
const categoryController = makeCategoryController();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves a list of all categories available in the platform.
 *     responses:
 *       200:
 *         description: A list of categories.
 */
router.get("/", categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieves details of a specific category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve.
 *     responses:
 *       200:
 *         description: Category details.
 *       404:
 *         description: Category not found.
 */
router.get("/:id", categoryController.getCategory);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category for the platform (Admin only).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       403:
 *         description: Forbidden. User does not have the required role.
 */
router.post(
  "/",
  protect,
  authorizeRole("ADMIN", "SUPERADMIN"),
  upload.array("images", 5),
  categoryController.createCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     description: Deletes a specific category by its ID (Admin only).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       403:
 *         description: Forbidden. User does not have the required role.
 */
router.delete(
  "/:id",
  protect,
  authorizeRole("ADMIN", "SUPERADMIN"),
  categoryController.deleteCategory
);

export default router;
