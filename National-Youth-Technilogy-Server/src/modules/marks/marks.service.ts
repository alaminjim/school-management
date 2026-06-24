/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database/prisma";

const toNumber = (val: any) => Number(val) || 0;

export const marksService = {
  createMarks: async (studentId: string, payload: any) => {
    try {
      return await prisma.$transaction(async (tx) => {

        if (!studentId) {
          throw new Error("Student ID missing");
        }

        if (!payload || typeof payload !== "object") {
          throw new Error("Invalid payload");
        }

        if (!payload.subjects || !Array.isArray(payload.subjects)) {
          throw new Error("Subjects must be an array");
        }

        const student = await tx.student.findUnique({
          where: { id: studentId }
        });

        if (!student) {
          throw new Error("Student not found");
        }

        const existingMark = await tx.mark.findFirst({
          where: {
            studentId,
            semesterTitle: payload.semesterTitle,
          },
        });

        if (existingMark) {
          await tx.mark.delete({
            where: { id: existingMark.id },
          });
        }

        const uniqueSubjectsMap = new Map();

        payload.subjects.forEach((sub: any) => {
          if (!sub.subjectCode) return;

          if (!uniqueSubjectsMap.has(sub.subjectCode)) {
            uniqueSubjectsMap.set(sub.subjectCode, sub);
          }
        });

        const subjects = Array.from(uniqueSubjectsMap.values());

        if (subjects.length === 0) {
          throw new Error("No valid subjects provided");
        }

        return await tx.mark.create({
          data: {
            semesterTitle: payload.semesterTitle || "N/A",
            totalCredit: toNumber(payload.totalCredit),
            totalPoints: toNumber(payload.totalPoints),
            cgpa: toNumber(payload.cgpa),
            grade: payload.grade || "N/A",
            status: payload.status || "N/A",
            studentId: studentId,

            subjects: {
              create: subjects.map((sub: any) => ({
                subjectCode: String(sub.subjectCode),
                subjectName: sub.subjectName || "N/A",
                credit: toNumber(sub.credit),
                written: toNumber(sub.written),
                practical: toNumber(sub.practical),
                viva: toNumber(sub.viva),
                totalMarks: toNumber(sub.totalMarks),
                fullMark: toNumber(sub.fullMark),
                gradePoint: toNumber(sub.gradePoint),
                grade: sub.grade || "N/A",
              })),
            },
          },
          include: { subjects: true },
        });
      });
    } catch (error: any) {
      console.error(" Prisma FULL Error:", error);
      throw error;
    }
  },

  getMarksByStudent: async (studentId: string) => {
    return await prisma.mark.findMany({
      where: { studentId },
      include: { subjects: true },
      orderBy: { createdAt: "desc" },
    });
  },
  deleteMark: async (markId: string) => {
  return await prisma.mark.delete({
    where: { id: markId },
  });
},

updateMark: async (markId: string, payload: any) => {
  return await prisma.$transaction(async (tx) => {
    await tx.subject.deleteMany({
      where: { markId },
    });

    return await tx.mark.update({
      where: { id: markId },
      data: {
        semesterTitle: payload.semesterTitle,
        totalCredit: payload.totalCredit,
        totalPoints: payload.totalPoints,
        cgpa: payload.cgpa,
        grade: payload.grade,
        status: payload.status,
        subjects: {
          create: payload.subjects,
        },
      },
      include: { subjects: true },
    });
  });
},
};

