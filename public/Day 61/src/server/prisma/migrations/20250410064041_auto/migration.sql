/*
  Warnings:

  - You are about to drop the column `status` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TrackingDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "TrackingDetail" DROP COLUMN "status";
