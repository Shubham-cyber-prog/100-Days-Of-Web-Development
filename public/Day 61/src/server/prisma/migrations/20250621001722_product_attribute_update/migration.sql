/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductAttribute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,attributeId,valueId]` on the table `ProductAttribute` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_productId_fkey";

-- DropIndex
DROP INDEX "ProductAttribute_productId_attributeId_idx";

-- DropIndex
DROP INDEX "ProductAttribute_productId_attributeId_key";

-- AlterTable
ALTER TABLE "ProductAttribute" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateIndex
CREATE INDEX "ProductAttribute_productId_idx" ON "ProductAttribute"("productId");

-- CreateIndex
CREATE INDEX "ProductAttribute_attributeId_idx" ON "ProductAttribute"("attributeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttribute_productId_attributeId_valueId_key" ON "ProductAttribute"("productId", "attributeId", "valueId");

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
