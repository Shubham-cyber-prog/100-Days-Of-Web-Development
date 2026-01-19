import prisma from "@/infra/database/database.config";
import { Section, SECTION_TYPE } from "@prisma/client";

export class SectionRepository {
  async findAll() {
    return prisma.section.findMany();
  }

  async findHero() {
    return prisma.section.findFirst({ where: { type: "HERO" } });
  }

  async findPromo() {
    return prisma.section.findFirst({ where: { type: "PROMOTIONAL" } });
  }

  async findArrivals() {
    return prisma.section.findFirst({ where: { type: "NEW_ARRIVALS" } });
  }

  async findBenefits() {
    return prisma.section.findFirst({ where: { type: "BENEFITS" } });
  }

  async create(data: Section) {
    return prisma.section.create({ data });
  }

  async findById(id: number) {
    return prisma.section.findUnique({ where: { id } });
  }

  async update(type: SECTION_TYPE, data: any) {
    return prisma.section.updateMany({
      where: { type },
      data,
    });
  }

  async deleteByType(type: SECTION_TYPE) {
    return prisma.section.deleteMany({ where: { type } });
  }
}
