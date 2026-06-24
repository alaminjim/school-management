import { prisma } from "../../database/prisma";

export const aboutSectionService = {
  create: async (data: { image: string; text?: string }) => {
    return await prisma.aboutSection.create({
      data: data,
    });
  },
  getAll: async () => {
    return await prisma.aboutSection.findMany();
  }
};

export const getService = {
  getAll: async () => {
    return await prisma.aboutSection.findMany({
    });
  }
};

export const updateService = {
  update: async (id: string, data: { image?: string; text?: string }) => {
    return await prisma.aboutSection.update({
      where: { id },
      data: data,
    });
  }
};

export const deleteService = {
  delete: async (id: string) => {
    return await prisma.aboutSection.delete({
      where: { id },
    });
  }
};