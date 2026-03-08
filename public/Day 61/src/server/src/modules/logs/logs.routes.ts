import express from "express";
import { makeLogsController } from "./logs.factory";

const router = express.Router();
const logsController = makeLogsController();

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get logs
 *     description: Retrieves a list of logs from the system.
 *     responses:
 *       200:
 *         description: A list of logs.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
router.get("/", logsController.getLogs);

/**
 * @swagger
 * /logs/{id}:
 *   get:
 *     summary: Get log details by ID
 *     description: Retrieves detailed information about a specific log by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the log to retrieve.
 *     responses:
 *       200:
 *         description: Log details.
 *       404:
 *         description: Log not found.
 */
router.get("/:id", logsController.getLogById);

/**
 * @swagger
 * /logs/{level}:
 *   get:
 *     summary: Get logs by level
 *     description: Retrieves logs filtered by their severity level.
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *         description: The severity level of the logs (e.g., info, warn, error).
 *     responses:
 *       200:
 *         description: Logs filtered by level.
 *       400:
 *         description: Invalid level provided.
 */
router.get("/:level", logsController.getLogByLevel);

/**
 * @swagger
 * /logs/{id}:
 *   delete:
 *     summary: Delete log by ID
 *     description: Deletes a specific log entry by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the log to delete.
 *     responses:
 *       200:
 *         description: Log successfully deleted.
 *       404:
 *         description: Log not found.
 */
router.delete("/:id", logsController.deleteLog);

/**
 * @swagger
 * /logs:
 *   delete:
 *     summary: Clear all logs
 *     description: Deletes all logs from the system.
 *     responses:
 *       200:
 *         description: All logs successfully deleted.
 */
router.delete("/", logsController.clearLogs);

export default router;
