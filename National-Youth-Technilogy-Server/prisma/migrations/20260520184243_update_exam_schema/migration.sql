-- AlterTable
ALTER TABLE "ExamAttempt" ADD COLUMN     "canRetry" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "mark" INTEGER NOT NULL DEFAULT 1;
