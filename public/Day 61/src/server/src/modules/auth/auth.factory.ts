import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

export const makeAuthController = () => {
  const repository = new AuthRepository();
  const service = new AuthService(repository);
  return new AuthController(service);
};