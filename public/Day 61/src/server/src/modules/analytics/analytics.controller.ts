import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import AppError from "@/shared/errors/AppError";
import { DateRangeQuery, ExportableData } from "./analytics.types";
import { makeLogsService } from "../logs/logs.factory";
import { AnalyticsService } from "./analytics.service";
import generateCSV from "@/shared/utils/export/generateCsv";
import generatePDF from "@/shared/utils/export/generatePdf";
import generateXLSX from "@/shared/utils/export/generateXlsx";

export class AnalyticsController {
  private logsService = makeLogsService();

  constructor(private analyticsService: AnalyticsService) {}

  createInteraction = asyncHandler(async (req: Request, res: Response) => {
    const { productId, type } = req.body;
    const user = req.user;
    const sessionId = req.session.id;

    const validTypes = ["view", "click", "other"];
    if (!type || !validTypes.includes(type)) {
      throw new AppError(
        400,
        "Invalid interaction type. Use: view, click, or other."
      );
    }

    const interaction = await this.analyticsService.createInteraction({
      userId: user?.id,
      sessionId, // Always include sessionId
      productId,
      type,
      performedBy: user?.id,
    });

    this.logsService.info("Interaction recorded", {
      userId: user?.id,
      sessionId,
      interactionType: type,
      productId,
    });

    sendResponse(res, 200, {
      data: { interaction },
      message: "Interaction recorded successfully",
    });
  });

  getYearRange = asyncHandler(async (req: Request, res: Response) => {
    const yearRange = await this.analyticsService.getYearRange();
    sendResponse(res, 200, {
      data: yearRange,
      message: "Year range retrieved successfully",
    });
  });

  exportAnalytics = asyncHandler(async (req: Request, res: Response) => {
    const { type, format, timePeriod, year, startDate, endDate } = req.query;

    const validFormats = ["csv", "pdf", "xlsx"];
    if (!format || !validFormats.includes(format as string)) {
      throw new AppError(400, "Invalid format. Use: csv, pdf, or xlsx");
    }

    const validTypes = ["overview", "products", "users", "all"];
    if (!type || !validTypes.includes(type as string)) {
      throw new AppError(
        400,
        "Invalid type. Use: overview, products, users, or all"
      );
    }

    const validPeriods = [
      "last7days",
      "lastMonth",
      "lastYear",
      "allTime",
      "custom",
    ];
    if (!timePeriod || !validPeriods.includes(timePeriod as string)) {
      throw new AppError(
        400,
        "Invalid or missing timePeriod. Use: last7days, lastMonth, lastYear, allTime, or custom"
      );
    }

    let selectedYear: number | undefined;
    if (year) {
      selectedYear = parseInt(year as string, 10);
      if (isNaN(selectedYear)) {
        throw new AppError(400, "Invalid year format.");
      }
    }

    let customStartDate: Date | undefined;
    let customEndDate: Date | undefined;
    if (startDate && endDate) {
      customStartDate = new Date(startDate as string);
      customEndDate = new Date(endDate as string);

      if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
        throw new AppError(
          400,
          "Invalid startDate or endDate format. Use YYYY-MM-DD."
        );
      }

      if (customStartDate > customEndDate) {
        throw new AppError(400, "startDate must be before endDate.");
      }
    } else if (startDate || endDate) {
      throw new AppError(
        400,
        "Both startDate and endDate must be provided for a custom range."
      );
    }

    const query: DateRangeQuery = {
      timePeriod: timePeriod as string,
      year: selectedYear,
      startDate: customStartDate,
      endDate: customEndDate,
    };

    let data: ExportableData;
    let filename: string;

    switch (type) {
      case "overview":
        data = await this.analyticsService.getAnalyticsOverview(query);
        filename = `analytics-overview-${new Date().toISOString()}.${format}`;
        break;
      case "products":
        data = await this.analyticsService.getProductPerformance(query);
        filename = `product-performance-${new Date().toISOString()}.${format}`;
        break;
      case "users":
        data = await this.analyticsService.getUserAnalytics(query);
        filename = `user-analytics-${new Date().toISOString()}.${format}`;
        break;
      case "all":
        data = {
          overview: await this.analyticsService.getAnalyticsOverview(query),
          products: await this.analyticsService.getProductPerformance(query),
          users: await this.analyticsService.getUserAnalytics(query),
        };
        filename = `all-analytics-${new Date().toISOString()}.${format}`;
        break;
      default:
        throw new AppError(400, "Invalid analytics type");
    }

    let result: string | Buffer;
    let contentType: string;

    switch (format) {
      case "csv":
        result = generateCSV(data);
        contentType = "text/csv";
        break;
      case "pdf":
        result = await generatePDF(data);
        contentType = "application/pdf";
        break;
      case "xlsx":
        result = await generateXLSX(data);
        contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      default:
        throw new AppError(400, "Invalid format");
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    console.log("result => ", result);
    res.send(result);

    await this.logsService.info("Exported analytics", {
      userId: req.user?.id,
      type,
      format,
      timePeriod,
    });
  });
}
