/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database/prisma";

export const examService = {
  createQuestion: async (payload: any, userId: string) => {
    const { questionText, options } = payload;

    const correctCount = options.filter(
      (o: any) => o.isCorrect === true,
    ).length;
    if (correctCount !== 1) {
      throw new Error("Exactly one correct option required");
    }

    return prisma.question.create({
      data: {
        questionText,
        userId,
        options: {
          create: options.map((o: any) => ({
            text: o.text,
            isCorrect: o.isCorrect,
          })),
        },
      },
      include: { options: true },
    });
  },

  getAllQuestions: async (userId: string) => {
    return prisma.question.findMany({
      where: { userId },
      include: { options: true },
      orderBy: { createdAt: "desc" },
    });
  },

  getQuestionsForStudent: async (studentId: string) => {
    const attempt = await prisma.examAttempt.findFirst({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    if (attempt && !attempt.canRetry) {
      throw new Error("You have already attempted this exam!");
    }

    return prisma.question.findMany({
      include: {
        options: {
          select: { id: true, text: true },
        },
      },
    });
  },

  submitExam: async (studentId: string, answers: any[]) => {
    const existingAttempt = await prisma.examAttempt.findFirst({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    if (existingAttempt && !existingAttempt.canRetry) {
      throw new Error("You have already attempted this exam!");
    }

    let score = 0;
    const examAnswers = [];

    for (const ans of answers) {
      const option = await prisma.option.findUnique({
        where: { id: ans.selectedOptionId },
      });
      const isCorrect = option?.isCorrect ?? false;
      if (isCorrect) score++;
      examAnswers.push({
        questionId: ans.questionId,
        selectedOption: ans.selectedOptionId,
        isCorrect,
      });
    }

    if (existingAttempt) {
      await prisma.examAnswer.deleteMany({
        where: { examAttemptId: existingAttempt.id },
      });
      await prisma.examAttempt.delete({
        where: { id: existingAttempt.id },
      });
    }

    const attempt = await prisma.examAttempt.create({
      data: {
        studentId,
        score,
        totalMarks: answers.length,
        canRetry: false,
        answers: {
          create: examAnswers,
        },
      },
    });

    return {
      score,
      totalMarks: answers.length,
      percentage: ((score / answers.length) * 100).toFixed(2),
      canRetry: attempt.canRetry,
    };
  },

  getStudentResult: async (studentId: string) => {
    return prisma.examAttempt.findMany({
      where: { studentId },
      include: { answers: true },
      orderBy: { createdAt: "desc" },
    });
  },

  //  Admin: সব Result
  getAllResults: async () => {
    return prisma.examAttempt.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            roll: true,
            studentId: true,
            guardianPhone: true,
          },
        },
        answers: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  //  Admin: Retry দাও
  giveRetry: async (studentId: string) => {
    const attempt = await prisma.examAttempt.findFirst({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    if (!attempt) {
      throw new Error("No exam attempt found for this student!");
    }

    return prisma.examAttempt.update({
      where: { id: attempt.id },
      data: { canRetry: true },
    });
  },

  deleteQuestion: async (id: string) => {
    const exist = await prisma.question.findUnique({ where: { id } });
    if (!exist) throw new Error("Question not found!");
    return prisma.question.delete({ where: { id } });
  },

  updateQuestion: async (id: string, payload: any) => {
    const exist = await prisma.question.findUnique({ where: { id } });
    if (!exist) throw new Error("Question not found!");

    const { questionText, options } = payload;

    return prisma.question.update({
      where: { id },
      data: {
        questionText,
        options: {
          deleteMany: {},
          create: options.map((o: any) => ({
            text: o.text,
            isCorrect: o.isCorrect,
          })),
        },
      },
      include: { options: true },
    });
  },
};


