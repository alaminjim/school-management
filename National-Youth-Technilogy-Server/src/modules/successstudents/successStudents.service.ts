/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database/prisma";

export const createSuccessStudentServer = {
  create: async (data: { name: string; image: string; position: any; items: any }) => {
    return await prisma.success.create({
      data: {
        name: data.name,
        image: data.image,
        position: data.position,
        items: data.items,
      },
    });
  },
};

export const getSuccessStudentService = {
  getAll: async () => {
    const result = await prisma.success.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
    });
    return result;
  },
};

export const updateSuccessStudentService = async (id: string, data: any) => {
  return await prisma.success.update({
    where: { id },
    data,
  });
};

export const deleteSuccessStudentService = async (id: string) => {
  return await prisma.success.delete({
    where: { id },
  });
};