/*
  Warnings:

  - Made the column `branchId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "branchId" SET NOT NULL;
