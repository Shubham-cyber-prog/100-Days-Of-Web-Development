/*
  Warnings:

  - You are about to drop the column `appleId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_appleId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "sessionId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "appleId";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_sessionId_key" ON "Cart"("sessionId");
