/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - The `status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TRANSACTION_STATUS" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'CANCELED', 'RETURNED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('PENDING', 'PAID', 'CANCELED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- DropIndex
DROP INDEX "Order_userId_status_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "status",
ADD COLUMN     "status" "PAYMENT_STATUS" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "status" "TRANSACTION_STATUS" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "ORDER_STATUS";

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
