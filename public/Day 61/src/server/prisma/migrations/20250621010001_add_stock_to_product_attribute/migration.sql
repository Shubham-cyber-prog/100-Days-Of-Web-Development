/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductAttribute` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_productId_fkey";

-- AlterTable
ALTER TABLE "ProductAttribute" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
