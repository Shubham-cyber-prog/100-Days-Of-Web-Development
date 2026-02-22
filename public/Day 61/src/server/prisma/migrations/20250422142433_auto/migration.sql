-- DropForeignKey
ALTER TABLE "CartEvent" DROP CONSTRAINT "CartEvent_userId_fkey";

-- AlterTable
ALTER TABLE "CartEvent" ADD COLUMN     "sessionId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartEvent" ADD CONSTRAINT "CartEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
