/*
  Warnings:

  - A unique constraint covering the columns `[branchId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "branchId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_branchId_key" ON "user"("branchId");
