import AppError from "@/shared/errors/AppError";
import { SectionRepository } from "./section.repository";
import { SECTION_TYPE } from "@prisma/client";

export class SectionService {
  constructor(private sectionRepository: SectionRepository) {}

  async getAllSections() {
    return this.sectionRepository.findAll();
  }

  async findHero() {
    return this.sectionRepository.findHero();
  }

  async findPromo() {
    return this.sectionRepository.findPromo();
  }

  async findBenefits() {
    return this.sectionRepository.findBenefits();
  }

  async findArrivals() {
    return this.sectionRepository.findArrivals();
  }

  async createSection(data: any) {
    return this.sectionRepository.create(data);
  }

  async getSectionById(id: number) {
    const section = await this.sectionRepository.findById(id);
    if (!section) throw new AppError(404, "Section not found");
    return section;
  }

  async updateSection(type: SECTION_TYPE, data: any) {
    return this.sectionRepository.update(type, data);
  }

  async deleteSection(type: SECTION_TYPE) {
    return this.sectionRepository.deleteByType(type);
  }
}
