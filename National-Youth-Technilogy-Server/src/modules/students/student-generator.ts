// utils/student-generator.ts

import { prisma } from "../../database/prisma";

// 6 digit roll
export const generateUniqueRoll = async () => {
  while (true) {
    const roll = Math.floor(100000 + Math.random() * 900000).toString();

    const exist = await prisma.student.findUnique({ where: { roll } });
    if (!exist) return roll;
  }
};

// 8 digit registration
export const generateUniqueReg = async () => {
  while (true) {
    const reg = Math.floor(10000000 + Math.random() * 90000000).toString();

    const exist = await prisma.student.findUnique({
      where: { regNumber: reg },
    });

    if (!exist) return reg;
  }
};

// custom studentId (mix style)
export const generateStudentId = async () => {
  while (true) {
    const studentId =
      "STU-" + Math.floor(100000 + Math.random() * 900000);

    const exist = await prisma.student.findUnique({
      where: { studentId },
    });

    if (!exist) return studentId;
  }
};