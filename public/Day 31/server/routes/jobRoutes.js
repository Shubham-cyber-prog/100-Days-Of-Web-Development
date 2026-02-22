import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { employerOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, employerOnly, createJob);
router.get("/", getJobs);

export default router;
