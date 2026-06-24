import { prisma } from "../../database/prisma";

export const heroImageTextService = {
  create: async (data: { image: string; text?: string }) => {
    return await prisma.heroImageText.create({
      data: data,
    });
  },
  getAll: async () => {
    return await prisma.heroImageText.findMany({
      orderBy: { createdAt: "asc" }, 
    });
  },
};

export const getService = {
  getAll: async () => {
    return await prisma.heroImageText.findMany({
      orderBy: { createdAt: "asc" }, 
    });
  },
};

export const updateService = {
  update: async (id: string, data: { image?: string; text?: string }) => {
    return await prisma.heroImageText.update({
      where: { id },
      data: data,
    });
  },
};

export const deleteService = {
  delete: async (id: string) => {
    return await prisma.heroImageText.delete({
      where: { id },
    });
  },
};
