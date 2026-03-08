import { ShipmentRepository } from "./shipment.repository";

export class ShipmentService {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async createShipment(data: {
    orderId: string;
    status: string;
    trackingNumber: string;
    shippedDate: Date;
    deliveryDate: Date;
    carrier: string;
  }) {
    const shipment = await this.shipmentRepository.createShipment(data);
    return shipment;
  }
}
