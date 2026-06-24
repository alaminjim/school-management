/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database/prisma";
import { QueryBuilder } from "../../shared/utils/query-builder";
import { generateStudentId, generateUniqueReg, generateUniqueRoll } from "./student-generator";


export const studentsService = {
  create: async (payload: any, userId: string) => {
    const roll = await generateUniqueRoll();
    const regNumber = await generateUniqueReg();
    const studentId = await generateStudentId();

    if (payload.courseId) {
      const courseExist = await prisma.course.findUnique({
        where: { id: payload.courseId },
      });

      if (!courseExist) {
        throw new Error("Invalid Course ID! Course not found.");
      }
    }

    return prisma.student.create({
      data: {
        ...payload,
        roll,
        regNumber,
        studentId,
        userId,
      },
    });
  },

  getAll: async (queryParams: any = {}) => {
    const { userId, ...restParams } = queryParams;

    const qb = new QueryBuilder(prisma.student as any, restParams, {
      searchableFields: ["name", "email"],
      filterableFields: ["roll", "studentId"],
    });

    qb.search().filter().paginate().sort().where({ userId });

    return qb.execute();
  },

  update: async (id: string, payload: any) => {
    const exist = await prisma.student.findUnique({ where: { id } });

    if (!exist) {
      throw new Error("Student not found");
    }

    return prisma.student.update({
      where: { id },
      data: payload,
    });
  },

  delete: async (id: string) => {
    const exist = await prisma.student.findUnique({ where: { id } });

    if (!exist) {
      throw new Error("Student not found");
    }

    return prisma.student.delete({
      where: { id },
    });
  },

  getResultByRoll: async (roll: string) => {
    const student = await prisma.student.findUnique({
      where: { roll },
      include: {
        marks: {
          include: { subjects: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!student) throw new Error("Student not found");

    return {
      name: student.name,
      studentId: student.studentId,
      roll: student.roll,
      regNumber: student.regNumber,
      fatherName: student.fatherName,
      motherName: student.motherName,
      dob: student.dob,
      gender: student.gender,
      picture: student.picture,
      guardianPhone: student.guardianPhone,
      studentAddress: student.studentAddress,
      district: student.district,
      duration: student.duration,
      educationQualification: student.educationQualification,
      institute: student.institute,
      directorName: student.directorName,
      marks: student.marks,
      month1: student.month1,
      month2: student.month2,
      year1: student.year1,
      year2: student.year2,
      issueDate: student.issueDate,
      expireDate: student.expireDate,
      joinedDate: student.issueDate,
    };
  },

  // Student Login (email + guardianPhone)
  studentLogin: async (email: string, guardianPhone: string) => {
    const student = await prisma.student.findFirst({
      where: {
        email,
        guardianPhone: guardianPhone,
      },
    });

    if (!student) {
      throw new Error("Email or guardianPhone is incorrect!");
    }
  if (!student.examAllowed) {
    throw new Error("Exam দেওয়ার অনুমতি নেই! Admin এর সাথে যোগাযোগ করো।");
  }
    const attempt = await prisma.examAttempt.findFirst({
      where: { studentId: student.id },
      orderBy: { createdAt: "desc" },
    });

    return {
      student,
      hasAttempted: !!attempt,
      canRetry: attempt?.canRetry ?? false,
    };
  },

  //  Admin: Student exam allow/disallow
  toggleExamAllowed: async (id: string) => {
    const student = await prisma.student.findUnique({ where: { id } });

    if (!student) {
      throw new Error("Student not found!");
    }

    return prisma.student.update({
      where: { id },
      data: {
        examAllowed: !student.examAllowed,
      },
    });
  },
};

