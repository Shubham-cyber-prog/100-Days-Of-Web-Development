import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { AddressService } from "@/modules/address/address.service";
import NotFoundError from "@/shared/errors/NotFoundError";
import { makeLogsService } from "../logs/logs.factory";

export class AddressController {
  private logsService = makeLogsService();
  constructor(private addressService: AddressService) {}

  getUserAddresses = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new NotFoundError("User");
    }
    const addresses = await this.addressService.getUserAddresses(userId);
    sendResponse(res, 200, {
      data: addresses,
      message: "Addresses retrieved successfully",
    });
  });

  getAddressDetails = asyncHandler(async (req: Request, res: Response) => {
    const { addressId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new NotFoundError("User");
    }
    const address = await this.addressService.getAddressDetails(
      addressId,
      userId
    );
    sendResponse(res, 200, {
      data: address,
      message: "Address details retrieved successfully",
    });
  });

  deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const { addressId } = req.params;

    await this.addressService.deleteAddress(addressId);
    sendResponse(res, 200, { message: "Address deleted successfully" });
    const start = Date.now();
    const end = Date.now();

    this.logsService.info("Address deleted", {
      userId: req.user?.id,
      sessionId: req.session.id,
      timePeriod: end - start,
    });
  });
}
