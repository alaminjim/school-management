/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database/prisma";

export const createTestimonialsServer = {
  create: async (data: { name: string; image: string; position: any; items: any }) => {
    return await prisma.testimonials.create({
      data: {
        name: data.name,
        image: data.image,
        position: data.position,
        items: data.items,
      },
    });
  },
};

export const getTestimonialsService = {
  getAll: async () => {
    const result = await prisma.testimonials.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
    });
    return result;
  },
};

export const updateTestimonialsService = async (id: string, data: any) => {
  return await prisma.testimonials.update({
    where: { id },
    data,
  });
};

export const deleteTestimonialsService = async (id: string) => {
  return await prisma.testimonials.delete({
    where: { id },
  });
};