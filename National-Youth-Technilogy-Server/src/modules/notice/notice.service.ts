import { prisma } from "../../database/prisma";

export const noticeService = {
  create: async (data: { image: string; caption?: string; order?: number }) => {
    return await prisma.notice.create({
      data: data,
    });
  },
  
  getAll: async () => {
    return await prisma.notice.findMany({
      // orderBy: { order: "asc" },
    });
  }
};

export const getService = {
  getAll: async () => {
    return await prisma.notice.findMany({
      // orderBy: { order: "asc" },
    });
  }
};

export const updateService = {
  update: async (id: string, data: { image?: string; caption?: string; order?: number }) => {
    return await prisma.notice.update({
      where: { id },
      data: data,
    });
  }
};

export const deleteService = {
  delete: async (id: string) => {
    return await prisma.notice.delete({
      where: { id },
    });
  }
};