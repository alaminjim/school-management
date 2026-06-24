import { prisma } from "../../database/prisma";
import { CreateTaskDataInput, UpdateTaskDataInput } from './task-data.types';

export const TaskDataService = {
  getAll: async () => {
    return await prisma.taskData.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  getById: async (id: string) => {
    const data = await prisma.taskData.findUnique({
      where: { id },
    });
    if (!data) throw new Error('Task data not found');
    return data;
  },

  create: async (input: CreateTaskDataInput) => {
    return await prisma.taskData.create({
      data: input,
    });
  },

  update: async (id: string, input: UpdateTaskDataInput) => {
    await TaskDataService.getById(id);
    return await prisma.taskData.update({
      where: { id },
      data: input,
    });
  },

  delete: async (id: string) => {
    await TaskDataService.getById(id);
    return await prisma.taskData.delete({
      where: { id },
    });
  },
};