-- CreateTable
CREATE TABLE "RestockAttribute" (
    "id" TEXT NOT NULL,
    "restockId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "valueId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RestockAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RestockAttribute_restockId_attributeId_idx" ON "RestockAttribute"("restockId", "attributeId");

-- AddForeignKey
ALTER TABLE "RestockAttribute" ADD CONSTRAINT "RestockAttribute_restockId_fkey" FOREIGN KEY ("restockId") REFERENCES "Restock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestockAttribute" ADD CONSTRAINT "RestockAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestockAttribute" ADD CONSTRAINT "RestockAttribute_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "AttributeValue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
