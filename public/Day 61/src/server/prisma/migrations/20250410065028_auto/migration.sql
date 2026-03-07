/*
  Warnings:

  - You are about to drop the `TrackingDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrackingDetail" DROP CONSTRAINT "TrackingDetail_orderId_fkey";

-- DropTable
DROP TABLE "TrackingDetail";
