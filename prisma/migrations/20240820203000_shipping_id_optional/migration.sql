/*
  Warnings:

  - A unique constraint covering the columns `[shippingId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shippingId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_shippingId_key" ON "Order"("shippingId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "Shipping"("id") ON DELETE SET NULL ON UPDATE CASCADE;
