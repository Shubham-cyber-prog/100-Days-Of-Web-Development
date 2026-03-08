-- DropForeignKey
ALTER TABLE "CartEvent" DROP CONSTRAINT "CartEvent_cartId_fkey";

-- AddForeignKey
ALTER TABLE "CartEvent" ADD CONSTRAINT "CartEvent_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
