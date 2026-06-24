/*
  Warnings:

  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_message_omr_sheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `all_table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `counters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exam_suggestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `noticeboard_your_pdf` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `omr_sheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `online_exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `online_exam_page_add_admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subject_suggestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- AlterTable
ALTER TABLE "contact_messages" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "subject" TEXT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Enrollment";

-- DropTable
DROP TABLE "admin_message_omr_sheet";

-- DropTable
DROP TABLE "all_table";

-- DropTable
DROP TABLE "contact";

-- DropTable
DROP TABLE "counters";

-- DropTable
DROP TABLE "exam_suggestion";

-- DropTable
DROP TABLE "noticeboard_your_pdf";

-- DropTable
DROP TABLE "omr_sheet";

-- DropTable
DROP TABLE "online_exam";

-- DropTable
DROP TABLE "online_exam_page_add_admin";

-- DropTable
DROP TABLE "question";

-- DropTable
DROP TABLE "subject_suggestion";

-- DropEnum
DROP TYPE "EnrollmentStatus";

-- DropEnum
DROP TYPE "PaymentStatus";

-- CreateTable
CREATE TABLE "Pdf" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileUrl" TEXT NOT NULL,
    "fileSize" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pdf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pdf_title_idx" ON "Pdf"("title");
