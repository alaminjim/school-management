/*
  Warnings:

  - Added the required column `updatedAt` to the `hero_image_text` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `notices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hero_image_text" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "notices" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
