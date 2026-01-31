/*
  Warnings:

  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
