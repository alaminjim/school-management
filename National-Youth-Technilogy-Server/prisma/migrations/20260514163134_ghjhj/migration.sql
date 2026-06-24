/*
  Warnings:

  - You are about to drop the column `caption` on the `notices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notices" DROP COLUMN "caption",
ADD COLUMN     "text" TEXT;
