/*
  Warnings:

  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;
