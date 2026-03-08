import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

export const makeOrderController = () => {
  const repository = new OrderRepository();
  const service = new OrderService(repository);
  return new OrderController(service);
};