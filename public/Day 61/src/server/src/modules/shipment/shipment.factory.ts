import { ShipmentRepository } from './shipment.repository';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';

export const makeShipmentController = () => {
  const repository = new ShipmentRepository();
  const service = new ShipmentService(repository);
  return new ShipmentController(service);
};