/*
  Warnings:

  - The `type` column on the `Section` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SECTION_TYPE" AS ENUM ('HERO', 'FEATURED_LIST', 'CTA', 'PROMO', 'TESTIMONIAL');

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "type",
ADD COLUMN     "type" "SECTION_TYPE" NOT NULL DEFAULT 'HERO';
