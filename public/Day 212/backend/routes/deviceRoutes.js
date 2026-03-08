import express from "express";
import Device from "../models/Device.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

router.post("/", verifyToken, async (req, res) => {
  const device = await Device.create(req.body);
  res.json(device);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await Device.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;