/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database/prisma";

export const createInstructorsServer = {
  create: async (data: { name: string; image: string; position: any; items: any }) => {
    return await prisma.instructors.create({
      data: {
        name: data.name,
        image: data.image,
        position: data.position,
        items: data.items,
      },
    });
  },
};

export const getInstructorsService = {
  getAll: async () => {
    const result = await prisma.instructors.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
    });
    return result;
  },
};

export const updateInstructorsService = async (id: string, data: any) => {
  return await prisma.instructors.update({
    where: { id },
    data,
  });
};

export const deleteInstructorsService = async (id: string) => {
  return await prisma.instructors.delete({
    where: { id },
  });
};