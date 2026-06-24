import { prisma } from "../../database/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const coursesService = {

  getAll: async () => {
    const result = await prisma.course.findMany();
    return result;
  },

  create: async (payload: any) => {
    const result = await prisma.course.create({
      data: payload,
    });
    return result;
  },
update: async (id: string, payload: any) => {
    return await prisma.course.update({
      where: { id: id },
      data: payload,
    });
  },
  delete: async (id: string) => {
    const result = await prisma.course.delete({
      where: {
        id: id,
      },
    });
    return result;
  },


  count: async () => {
    const result = await prisma.course.count();
    return result;
  },
getById: async (id: string) => {
  return await prisma.course.findUnique({
    where: { id },
  });
},

};


