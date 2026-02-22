import express from "express";
import { createAppointment, getAppointments, checkStatus, updateAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/create", createAppointment);       // Patient submits form
router.get("/all", getAppointments);             // Doctor dashboard
router.post("/status", checkStatus);             // Patient checks status
router.put("/update/:id", updateAppointment);    // Patient edits appointment

export default router;