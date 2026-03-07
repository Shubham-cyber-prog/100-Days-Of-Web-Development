import AppError from "@/shared/errors/AppError";
import { AddressRepository } from "./address.repository";

export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  async getUserAddresses(userId: string) {
    const addresses = await this.addressRepository.findAddressesByUserId(
      userId
    );
    if (!addresses || addresses.length === 0) {
      throw new AppError(404, "No addresses found for this user");
    }
    return addresses;
  }

  async getAddressDetails(addressId: string, userId: string) {
    const address = await this.addressRepository.findAddressById(addressId);
    if (!address) {
      throw new AppError(404, "Address not found");
    }
    if (address.userId !== userId) {
      throw new AppError(403, "You are not authorized to view this address");
    }
    return address;
  }

  async deleteAddress(addressId: string) {
    const address = await this.addressRepository.findAddressById(addressId);
    if (!address) {
      throw new AppError(404, "Address not found");
    }
    return this.addressRepository.deleteAddress(addressId);
  }
}
