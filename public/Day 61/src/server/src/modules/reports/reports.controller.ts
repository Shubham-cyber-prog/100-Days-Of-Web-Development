import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import AppError from "@/shared/errors/AppError";
import { ReportsService } from "./reports.service";
import { DateRangeQuery, ReportData } from "./reports.types";
import { makeLogsService } from "../logs/logs.factory";
import generateCSV from "@/shared/utils/export/generateCsv";
import generatePDF from "@/shared/utils/export/generatePdf";
import generateXLSX from "@/shared/utils/export/generateXlsx";

export class ReportsController {
  private logsService = makeLogsService();

  constructor(private reportsService: ReportsService) {}

  generateReport = asyncHandler(async (req: Request, res: Response) => {
    const { type, format, timePeriod, year, startDate, endDate } = req.query;
    const user = req.user; // From auth middleware

    // Validate format
    const validFormats = ["csv", "pdf", "xlsx"];
    if (!format || !validFormats.includes(format as string)) {
      throw new AppError(400, "Invalid format. Use: csv, pdf, or xlsx");
    }

    // Validate type
    const validTypes = ["sales", "user_retention", "all"];
    if (!type || !validTypes.includes(type as string)) {
      throw new AppError(
        400,
        "Invalid type. Use: sales, user_retention, or all"
      );
    }

    // Validate timePeriod
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

    // Validate year if provided
    let selectedYear: number | undefined;
    if (year) {
      selectedYear = parseInt(year as string, 10);
      if (isNaN(selectedYear)) {
        throw new AppError(400, "Invalid year format.");
      }
    }

    // Validate custom date range
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

    let data: ReportData;
    let filename: string;

    switch (type) {
      case "sales":
        data = await this.reportsService.generateSalesReport(query);
        filename = `sales-report-${new Date().toISOString()}.${format}`;
        break;
      case "user_retention":
        data = await this.reportsService.generateUserRetentionReport(query);
        filename = `user-retention-report-${new Date().toISOString()}.${format}`;
        break;
      case "all":
        data = {
          sales: await this.reportsService.generateSalesReport(query),
          userRetention: await this.reportsService.generateUserRetentionReport(
            query
          ),
        };
        filename = `combined-report-${new Date().toISOString()}.${format}`;
        break;
      default:
        throw new AppError(400, "Invalid report type");
    }

    // Log report generation in database
    await this.reportsService.logReport({
      type: type as string,
      format: format as string,
      userId: user?.id,
      parameters: query,
    });

    let result: string | Buffer;
    let contentType: string;

    const start = Date.now();

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

    const end = Date.now();

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(result);

    // Log to logs service
    await this.logsService.info("Report generated", {
      userId: user?.id,
      sessionId: req.session?.id,
      timePeriod: end - start,
      reportType: type,
      format,
    });
  });
}
