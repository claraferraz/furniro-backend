/*
  Warnings:

  - You are about to drop the column `sku` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `detail` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDetails` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgID` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "sku",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "productDetails" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "color",
DROP COLUMN "detail",
DROP COLUMN "image",
DROP COLUMN "size",
DROP COLUMN "stock",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "imgID" INTEGER NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "tags" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" MONEY NOT NULL;

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" SERIAL NOT NULL,
    "defaultImag" TEXT NOT NULL,
    "imgOne" TEXT NOT NULL,
    "imgTwo" TEXT NOT NULL,
    "imgThree" TEXT NOT NULL,
    "imgFour" TEXT NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDetails" (
    "color" TEXT,
    "size" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "detailId" SERIAL NOT NULL,
    "productId" SERIAL NOT NULL,

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("productId","detailId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductImages_defaultImag_key" ON "ProductImages"("defaultImag");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImages_imgOne_key" ON "ProductImages"("imgOne");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImages_imgTwo_key" ON "ProductImages"("imgTwo");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImages_imgThree_key" ON "ProductImages"("imgThree");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImages_imgFour_key" ON "ProductImages"("imgFour");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tag_key" ON "Tags"("tag");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tags_fkey" FOREIGN KEY ("tags") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_imgID_fkey" FOREIGN KEY ("imgID") REFERENCES "ProductImages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_productDetails_fkey" FOREIGN KEY ("productId", "productDetails") REFERENCES "ProductDetails"("productId", "detailId") ON DELETE RESTRICT ON UPDATE CASCADE;
