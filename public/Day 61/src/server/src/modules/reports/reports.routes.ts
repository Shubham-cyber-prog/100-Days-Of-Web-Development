import { Router } from "express";
import { makeReportsController } from "./reports.factory";
import protect from "@/shared/middlewares/protect";

const router = Router();
const controller = makeReportsController();

/**
 * @swagger
 * /reports/generate:
 *   get:
 *     summary: Generate a report
 *     description: Generates a report for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report generated successfully.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.get("/generate", protect, controller.generateReport);

export default router;
