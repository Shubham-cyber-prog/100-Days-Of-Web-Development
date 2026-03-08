/*
  Warnings:

  - The values [PROCESSING] on the enum `ORDER_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ORDER_STATUS_new" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "ORDER_STATUS_new" USING ("status"::text::"ORDER_STATUS_new");
ALTER TYPE "ORDER_STATUS" RENAME TO "ORDER_STATUS_old";
ALTER TYPE "ORDER_STATUS_new" RENAME TO "ORDER_STATUS";
DROP TYPE "ORDER_STATUS_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
