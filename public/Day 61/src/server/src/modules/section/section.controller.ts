import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { SectionService } from "./section.service";
import { makeLogsService } from "../logs/logs.factory";
import { uploadToCloudinary } from "@/shared/utils/uploadToCloudinary";
import { SECTION_TYPE } from "@prisma/client";

export class SectionController {
  private logsService = makeLogsService();
  constructor(private sectionService: SectionService) {}

  getAllSections = asyncHandler(async (_req: Request, res: Response) => {
    const sections = await this.sectionService.getAllSections();
    sendResponse(res, 200, {
      data: { sections },
      message: "Sections fetched successfully",
    });
  });

  findHero = asyncHandler(async (_req: Request, res: Response) => {
    const hero = await this.sectionService.findHero();
    sendResponse(res, 200, {
      data: { hero },
      message: "Hero fetched successfully",
    });
  });

  findPromo = asyncHandler(async (_req: Request, res: Response) => {
    const promo = await this.sectionService.findPromo();
    sendResponse(res, 200, {
      data: { promo },
      message: "Promo fetched successfully",
    });
  });

  findArrivals = asyncHandler(async (_req: Request, res: Response) => {
    const arrivals = await this.sectionService.findArrivals();
    sendResponse(res, 200, {
      data: { arrivals },
      message: "Arrivals fetched successfully",
    });
  });

  findBenefits = asyncHandler(async (_req: Request, res: Response) => {
    const benefits = await this.sectionService.findBenefits();
    sendResponse(res, 200, {
      data: { benefits },
      message: "Benefits fetched successfully",
    });
  });

  createSection = asyncHandler(async (req, res) => {
    const {
      title,
      description,
      type,
      ctaText,
      icons,
      link,
      primaryColor,
      secondaryColor,
    } = req.body;
    const files = req.files as Express.Multer.File[];

    // Upload images to Cloudinary
    let imageUrls: string[] = [];
    if (Array.isArray(files) && files.length > 0) {
      const uploadedImages = await uploadToCloudinary(files);
      imageUrls = uploadedImages.map((img) => img.url).filter(Boolean); // Remove any falsy values
    }

    // Prepare section data, excluding undefined values
    const sectionData: any = {
      title: title || undefined,
      description: description || undefined,
      type: type || undefined,
      ctaText: ctaText || undefined,
      icons: icons || undefined,
      link: link || undefined,
      primaryColor: primaryColor || undefined,
      secondaryColor: secondaryColor || undefined,
      images: imageUrls.length > 0 ? imageUrls : undefined, // Use undefined if no images
    };

    // Remove undefined keys to avoid Prisma validation errors
    Object.keys(sectionData).forEach(
      (key) => sectionData[key] === undefined && delete sectionData[key]
    );

    const section = await this.sectionService.createSection(sectionData);

    sendResponse(res, 201, {
      data: { section },
      message: "Section created successfully",
    });

    // Log the action
    const start = Date.now();
    const end = Date.now();
    this.logsService.info("Section created", {
      userId: req.user?.id,
      sessionId: req.session.id,
      timePeriod: end - start,
    });
  });

  getSectionById = asyncHandler(async (req: Request, res: Response) => {
    const section = await this.sectionService.getSectionById(
      Number(req.params.id)
    );
    sendResponse(res, 200, {
      data: section,
      message: "Section fetched successfully",
    });
  });

  updateSection = asyncHandler(async (req: Request, res: Response) => {
    const type = req.params.type as SECTION_TYPE;

    const updated = await this.sectionService.updateSection(type, req.body);
    sendResponse(res, 200, {
      data: { updated },
      message: "Section updated successfully",
    });

    const start = Date.now();
    const end = Date.now();

    this.logsService.info("Section updated", {
      userId: req.user?.id,
      sessionId: req.session.id,
      timePeriod: end - start,
    });
  });

  deleteSection = asyncHandler(async (req: Request, res: Response) => {
    const type = req.params.type as SECTION_TYPE;
    await this.sectionService.deleteSection(type);
    sendResponse(res, 200, { message: "Section deleted successfully" });
  });
}
