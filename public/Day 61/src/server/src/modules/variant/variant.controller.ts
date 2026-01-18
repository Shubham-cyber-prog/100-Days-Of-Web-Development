import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { VariantService } from "./variant.service";
import { makeLogsService } from "../logs/logs.factory";
import AppError from "@/shared/errors/AppError";
import { uploadToCloudinary } from "@/shared/utils/uploadToCloudinary";

export class VariantController {
  private logsService = makeLogsService();
  constructor(private variantService: VariantService) {}

  getAllVariants = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const {
        variants,
        totalResults,
        totalPages,
        currentPage,
        resultsPerPage,
      } = await this.variantService.getAllVariants(req.query);
      sendResponse(res, 200, {
        data: {
          variants,
          totalResults,
          totalPages,
          currentPage,
          resultsPerPage,
        },
        message: "Variants fetched successfully",
      });
    }
  );

  getRestockHistory = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id: variantId } = req.params;
      const { page = "1", limit = "10" } = req.query;
      const {
        restocks,
        totalResults,
        totalPages,
        currentPage,
        resultsPerPage,
      } = await this.variantService.getRestockHistory(
        variantId,
        parseInt(page as string),
        parseInt(limit as string)
      );
      sendResponse(res, 200, {
        data: {
          restocks,
          totalResults,
          totalPages,
          currentPage,
          resultsPerPage,
        },
        message: "Restock history fetched successfully",
      });
    }
  );

  getVariantById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id: variantId } = req.params;
      const variant = await this.variantService.getVariantById(variantId);
      sendResponse(res, 200, {
        data: { variant },
        message: "Variant fetched successfully",
      });
    }
  );

  getVariantBySku = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { sku } = req.params;
      const variant = await this.variantService.getVariantBySku(sku);
      sendResponse(res, 200, {
        data: { variant },
        message: "Variant fetched successfully",
      });
    }
  );

  createVariant = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const {
        productId,
        sku,
        price,
        stock,
        lowStockThreshold,
        barcode,
        warehouseLocation,
        attributes,
      } = req.body;

      let parsedAttributes;
      try {
        parsedAttributes =
          typeof attributes === "string" ? JSON.parse(attributes) : attributes;
        if (!Array.isArray(parsedAttributes)) {
          throw new AppError(400, "Attributes must be an array");
        }
        parsedAttributes.forEach((attr: any, index: number) => {
          if (!attr.attributeId || !attr.valueId) {
            throw new AppError(
              400,
              `Invalid attribute structure at index ${index}`
            );
          }
        });
        const attributeIds = parsedAttributes.map(
          (attr: any) => attr.attributeId
        );
        if (new Set(attributeIds).size !== attributeIds.length) {
          throw new AppError(400, "Duplicate attributes in variant");
        }
      } catch (error) {
        throw new AppError(400, "Invalid attributes format");
      }

      console.log("req.files: ", req.files);
      const files = req.files as Express.Multer.File[];
      let imageUrls: string[] = [];
      if (Array.isArray(files) && files.length > 0) {
        const uploadedImages = await uploadToCloudinary(files);
        imageUrls = uploadedImages.map((img) => img.url).filter(Boolean);
      }

      const variant = await this.variantService.createVariant({
        productId,
        sku,
        price: Number(price),
        stock: Number(stock),
        lowStockThreshold: lowStockThreshold
          ? Number(lowStockThreshold)
          : undefined,
        barcode,
        warehouseLocation,
        images: imageUrls,
        attributes: parsedAttributes,
      });

      sendResponse(res, 201, {
        data: { variant },
        message: "Variant created successfully",
      });
      this.logsService.info("Variant created", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );

  updateVariant = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id: variantId } = req.params;
      const {
        sku,
        price,
        stock,
        lowStockThreshold,
        barcode,
        warehouseLocation,
        attributes,
      } = req.body;

      let parsedAttributes;
      if (attributes) {
        try {
          parsedAttributes =
            typeof attributes === "string"
              ? JSON.parse(attributes)
              : attributes;
          if (!Array.isArray(parsedAttributes)) {
            throw new AppError(400, "Attributes must be an array");
          }
          parsedAttributes.forEach((attr: any, index: number) => {
            if (!attr.attributeId || !attr.valueId) {
              throw new AppError(
                400,
                `Invalid attribute structure at index ${index}`
              );
            }
          });
          const attributeIds = parsedAttributes.map(
            (attr: any) => attr.attributeId
          );
          if (new Set(attributeIds).size !== attributeIds.length) {
            throw new AppError(400, "Duplicate attributes in variant");
          }
        } catch (error) {
          throw new AppError(400, "Invalid attributes format");
        }
      }

      const files = req.files as Express.Multer.File[];
      let imageUrls: string[] = [];
      if (Array.isArray(files) && files.length > 0) {
        const uploadedImages = await uploadToCloudinary(files);
        imageUrls = uploadedImages.map((img) => img.url).filter(Boolean);
      }

      const variant = await this.variantService.updateVariant(variantId, {
        ...(sku && { sku }),
        ...(price !== undefined && { price: Number(price) }),
        ...(stock !== undefined && { stock: Number(stock) }),
        ...(lowStockThreshold !== undefined && {
          lowStockThreshold: Number(lowStockThreshold),
        }),
        ...(barcode !== undefined && { barcode }),
        ...(warehouseLocation !== undefined && { warehouseLocation }),
        ...(imageUrls.length > 0 && { images: imageUrls }),
        ...(parsedAttributes && { attributes: parsedAttributes }),
      });

      sendResponse(res, 200, {
        data: { variant },
        message: "Variant updated successfully",
      });
      this.logsService.info("Variant updated", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );

  restockVariant = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id: variantId } = req.params;
      const { quantity, notes } = req.body;
      console.log("req.body: ", req.body);

      const parsedQuantity = Number(quantity);
      if (!quantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
        throw new AppError(400, "Valid positive quantity is required");
      }

      const { restock, isLowStock } = await this.variantService.restockVariant(
        variantId,
        parsedQuantity,
        notes,
        req.user?.id
      );

      sendResponse(res, 200, {
        data: { restock, isLowStock },
        message: "Variant restocked successfully",
      });
      this.logsService.info("Variant restocked", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );

  deleteVariant = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id: variantId } = req.params;
      await this.variantService.deleteVariant(variantId);
      sendResponse(res, 200, { message: "Variant deleted successfully" });
      this.logsService.info("Variant deleted", {
        userId: req.user?.id,
        sessionId: req.session.id,
      });
    }
  );
}
