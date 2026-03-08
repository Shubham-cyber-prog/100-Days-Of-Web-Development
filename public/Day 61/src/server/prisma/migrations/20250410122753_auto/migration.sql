-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "showInNavbar" BOOLEAN NOT NULL DEFAULT true;
