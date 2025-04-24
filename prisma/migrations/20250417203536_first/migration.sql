/*
  Warnings:

  - A unique constraint covering the columns `[detailId]` on the table `ProductDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_detailId_key" ON "ProductDetails"("detailId");
