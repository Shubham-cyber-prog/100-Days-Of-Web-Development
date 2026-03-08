import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { ShipmentService } from "./shipment.service";
import { makeLogsService } from "../logs/logs.factory";

export class ShipmentController {
  private logsService = makeLogsService();
  constructor(private shipmentService: ShipmentService) {}

  createShipment = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const data = req.body;
      const shipment = await this.shipmentService.createShipment(data);
      sendResponse(res, 201, {
        data: shipment,
        message: "Shipment created successfully",
      });
      const start = Date.now();
      const end = Date.now();

      this.logsService.info("Shipment created", {
        userId: req.user?.id,
        sessionId: req.session.id,
        timePeriod: end - start,
      });
    }
  );
}
