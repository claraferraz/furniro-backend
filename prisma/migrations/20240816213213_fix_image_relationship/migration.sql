/*
  Warnings:

  - You are about to drop the column `imgID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `defaultImag` on the `ProductImages` table. All the data in the column will be lost.
  - You are about to drop the column `imgFour` on the `ProductImages` table. All the data in the column will be lost.
  - You are about to drop the column `imgOne` on the `ProductImages` table. All the data in the column will be lost.
  - You are about to drop the column `imgThree` on the `ProductImages` table. All the data in the column will be lost.
  - You are about to drop the column `imgTwo` on the `ProductImages` table. All the data in the column will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `ProductImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ProductImages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_imgID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_tags_fkey";

-- DropIndex
DROP INDEX "ProductImages_defaultImag_key";

-- DropIndex
DROP INDEX "ProductImages_imgFour_key";

-- DropIndex
DROP INDEX "ProductImages_imgOne_key";

-- DropIndex
DROP INDEX "ProductImages_imgThree_key";

-- DropIndex
DROP INDEX "ProductImages_imgTwo_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imgID";

-- AlterTable
ALTER TABLE "ProductDetails" ALTER COLUMN "productId" DROP DEFAULT;
DROP SEQUENCE "ProductDetails_productId_seq";

-- AlterTable
ALTER TABLE "ProductImages" DROP COLUMN "defaultImag",
DROP COLUMN "imgFour",
DROP COLUMN "imgOne",
DROP COLUMN "imgThree",
DROP COLUMN "imgTwo",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tags";

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
