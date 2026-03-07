import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

export const makePaymentController = () => {
  const repository = new PaymentRepository();
  const service = new PaymentService(repository);
  return new PaymentController(service);
};