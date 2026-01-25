import { AttributeController } from "./attribute.controller";
import { AttributeRepository } from "./attribute.repository";
import { AttributeService } from "./attribute.service";

export const makeAttributeController = () => {
  const repo = new AttributeRepository();
  const service = new AttributeService(repo);
  const controller = new AttributeController(service);
  return controller;
};
