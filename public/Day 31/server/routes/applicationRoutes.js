import express from "express";
import {
  applyToJob,
  getApplicantsForJob,
  getMyApplications,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { updateApplicationStatus } from "../controllers/applicationController.js";
import { employerOnly } from "../middleware/roleMiddleware.js";


const router = express.Router();

// jobseeker
router.post("/:jobId", protect, applyToJob);
router.get("/me", protect, getMyApplications);

// employer
router.get("/job/:jobId", protect, getApplicantsForJob);

router.patch(
  "/:applicationId/status",
  protect,
  employerOnly,
  updateApplicationStatus
);

export default router;
