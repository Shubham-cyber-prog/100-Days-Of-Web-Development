import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

export const makeAddressController = () => {
  const repository = new AddressRepository();
  const service = new AddressService(repository);
  return new AddressController(service);
};