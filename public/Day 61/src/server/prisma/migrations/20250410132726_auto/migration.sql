/*
  Warnings:

  - Added the required column `type` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "type" TEXT NOT NULL;
