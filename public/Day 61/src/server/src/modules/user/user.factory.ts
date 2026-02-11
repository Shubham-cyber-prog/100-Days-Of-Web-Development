import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

export const makeUserController = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  return new UserController(service);
};