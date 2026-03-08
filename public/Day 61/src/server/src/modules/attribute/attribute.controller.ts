import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { AttributeService } from "./attribute.service";
import { makeLogsService } from "../logs/logs.factory";

export class AttributeController {
  private logsService = makeLogsService();
  constructor(private attributeService: AttributeService) {}

  createAttribute = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { name } = req.body;
      const attribute = await this.attributeService.createAttribute({
        name,
      });
      sendResponse(res, 201, {
        data: { attribute },
        message: "Attribute created successfully",
      });
      this.logsService.info("Attribute created", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );

  createAttributeValue = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { attributeId, value } = req.body;
      const attributeValue = await this.attributeService.createAttributeValue({
        attributeId,
        value,
      });
      sendResponse(res, 201, {
        data: { attributeValue },
        message: "Attribute value created successfully",
      });
      this.logsService.info("Attribute value created", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );

  assignAttributeToCategory = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { categoryId, attributeId, isRequired } = req.body;
      const result = await this.attributeService.assignAttributeToCategory({
        categoryId,
        attributeId,
        isRequired,
      });
      sendResponse(res, 201, {
        data: { result },
        message: "Attribute assigned to category successfully",
      });
      this.logsService.info("Attribute assigned to category", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );

  // assignAttributeToProduct = asyncHandler(
  //   async (req: Request, res: Response): Promise<void> => {
  //     const { productId, attributeId, valueId, customValue } = req.body;
  //     const result = await this.attributeService.assignAttributeToProduct({
  //       productId,
  //       attributeId,
  //       valueId,
  //       customValue,
  //     });
  //     sendResponse(res, 201, {
  //       data: { result },
  //       message: "Attribute assigned to product successfully",
  //     });
  //     this.logsService.info("Attribute assigned to product", {
  //       userId: req.user?.id,
  //       sessionId: req.session.id,
  //     });
  //   }
  // );

  getAllAttributes = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const attributes = await this.attributeService.getAllAttributes(
        req.query
      );
      sendResponse(res, 200, {
        data: { attributes },
        message: "Attributes fetched successfully",
      });
    }
  );

  getAttribute = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const attribute = await this.attributeService.getAttribute(id);
      sendResponse(res, 200, {
        data: { attribute },
        message: "Attribute fetched successfully",
      });
    }
  );

  deleteAttribute = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      console.log("icoming id => ", id);
      await this.attributeService.deleteAttribute(id);
      sendResponse(res, 200, { message: "Attribute deleted successfully" });
      this.logsService.info("Attribute deleted", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );

  deleteAttributeValue = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      console.log("Incoming attribute value id => ", id);
      await this.attributeService.deleteAttributeValue(id);
      sendResponse(res, 200, {
        message: "Attribute value deleted successfully",
      });
      this.logsService.info("Attribute value deleted", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );
}
