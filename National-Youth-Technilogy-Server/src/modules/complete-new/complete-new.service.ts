import { prisma } from "../../database/prisma";
import { CreateCompleteNewInput, UpdateCompleteNewInput } from "./complete-new.types";

export const CompleteNewService = {
  getAll: async () => {
    return await prisma.completeNewData.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  getById: async (id: string) => {
    const data = await prisma.completeNewData.findUnique({ where: { id } });
    if (!data) throw new Error("Not found");
    return data;
  },

  create: async (input: CreateCompleteNewInput) => {
    return await prisma.completeNewData.create({ data: input });
  },

  update: async (id: string, input: UpdateCompleteNewInput) => {
    await CompleteNewService.getById(id);
    return await prisma.completeNewData.update({ where: { id }, data: input });
  },

  delete: async (id: string) => {
    await CompleteNewService.getById(id);
    return await prisma.completeNewData.delete({ where: { id } });
  },
};