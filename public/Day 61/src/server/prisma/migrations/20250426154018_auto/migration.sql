/*
  Warnings:

  - You are about to drop the `ChatParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_userId_fkey";

-- DropIndex
DROP INDEX "Chat_createdAt_idx";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "ChatParticipant";

-- CreateIndex
CREATE INDEX "Chat_userId_idx" ON "Chat"("userId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
