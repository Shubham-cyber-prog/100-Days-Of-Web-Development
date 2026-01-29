import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

export const makeCartController = () => {
  const repository = new CartRepository();
  const service = new CartService(repository);
  return new CartController(service);
};