-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('active', 'cancelled', 'completed');

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "coursePrice" DECIMAL(10,2) NOT NULL,
    "studentName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "paidAt" TIMESTAMP(3),
    "currency" TEXT DEFAULT 'BDT',
    "gatewayResponse" JSONB,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'active',
    "adminNote" TEXT,
    "updatedBy" TEXT,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Enrollment_paymentStatus_idx" ON "Enrollment"("paymentStatus");

-- CreateIndex
CREATE INDEX "Enrollment_status_idx" ON "Enrollment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_email_courseId_key" ON "Enrollment"("email", "courseId");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
