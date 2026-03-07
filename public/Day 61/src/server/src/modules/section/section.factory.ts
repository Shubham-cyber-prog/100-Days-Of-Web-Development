import { SectionController } from "./section.controller";
import { SectionRepository } from "./section.repository";
import { SectionService } from "./section.service";

export const makeSectionController = () => {
  const repo = new SectionRepository();
  const service = new SectionService(repo);
  const controller = new SectionController(service);
  return controller;
};
