-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'TEXT',
ADD COLUMN     "url" TEXT;
