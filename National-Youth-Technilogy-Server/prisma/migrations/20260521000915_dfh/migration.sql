-- DropForeignKey
ALTER TABLE "ExamAnswer" DROP CONSTRAINT "ExamAnswer_examAttemptId_fkey";

-- AddForeignKey
ALTER TABLE "ExamAnswer" ADD CONSTRAINT "ExamAnswer_examAttemptId_fkey" FOREIGN KEY ("examAttemptId") REFERENCES "ExamAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
