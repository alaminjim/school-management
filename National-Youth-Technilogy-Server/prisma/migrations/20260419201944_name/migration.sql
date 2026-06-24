/*
  Warnings:

  - You are about to drop the column `cgpa` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `semesterId` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the `semesters` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[subjectCode,markId]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gradePoint` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `markId` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectName` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMarks` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Made the column `subjectCode` on table `subjects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `credit` on table `subjects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `grade` on table `subjects` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "semesters" DROP CONSTRAINT "semesters_studentId_fkey";

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_semesterId_fkey";

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "cgpa",
DROP COLUMN "name",
DROP COLUMN "semesterId",
ADD COLUMN     "gradePoint" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "markId" TEXT NOT NULL,
ADD COLUMN     "practical" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "subjectName" TEXT NOT NULL,
ADD COLUMN     "totalMarks" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "viva" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "written" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "subjectCode" SET NOT NULL,
ALTER COLUMN "credit" SET NOT NULL,
ALTER COLUMN "grade" SET NOT NULL;

-- DropTable
DROP TABLE "semesters";

-- CreateTable
CREATE TABLE "marks" (
    "id" TEXT NOT NULL,
    "semesterTitle" TEXT NOT NULL,
    "totalCredit" DOUBLE PRECISION NOT NULL,
    "totalPoints" DOUBLE PRECISION NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "grade" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_subjectCode_markId_key" ON "subjects"("subjectCode", "markId");

-- AddForeignKey
ALTER TABLE "marks" ADD CONSTRAINT "marks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_markId_fkey" FOREIGN KEY ("markId") REFERENCES "marks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
