import express from "express";
import { makeVariantController } from "./variant.factory";
import protect from "@/shared/middlewares/protect";

const router = express.Router();
const controller = makeVariantController();

router.get("/", controller.getAllVariants);
router.get("/:id", controller.getVariantById);
router.get("/sku/:sku", controller.getVariantBySku);
router.get('/:id/restock-history', controller.getRestockHistory);
router.post("/", controller.createVariant);
router.patch("/:id", controller.updateVariant);
router.post("/:id/restock", protect, controller.restockVariant);
router.delete("/:id", controller.deleteVariant);

export default router;