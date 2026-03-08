import express from "express";
import { makeAttributeController } from "./attribute.factory";

const router = express.Router();
const controller = makeAttributeController();

router.get("/", controller.getAllAttributes);
router.get("/:id", controller.getAttribute);
router.post("/", controller.createAttribute);
router.post("/value", controller.createAttributeValue);
router.post("/assign-category", controller.assignAttributeToCategory);
// router.post("/assign-product", controller.assignAttributeToProduct);
router.delete("/:id", controller.deleteAttribute);
router.delete("/value/:id", controller.deleteAttributeValue);

export default router;
