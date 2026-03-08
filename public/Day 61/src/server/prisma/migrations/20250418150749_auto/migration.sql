-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT NOT NULL,
    "icons" TEXT,
    "link" TEXT,
    "ctaText" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_id_key" ON "Section"("id");
