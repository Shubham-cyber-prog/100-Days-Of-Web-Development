-- DropIndex
DROP INDEX "Interaction_userId_productId_idx";

-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "sessionId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Interaction_userId_sessionId_productId_idx" ON "Interaction"("userId", "sessionId", "productId");
