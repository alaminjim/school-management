import { prisma } from "../../database/prisma";

export const sliderService = {
  create: async (data: { image: string; caption?: string; order?: number }) => {
    return await prisma.homeSlider.create({
      data: data,
    });
  },
  
  getAll: async () => {
    return await prisma.homeSlider.findMany({
      orderBy: { order: "asc" },
    });
  }
};

export const getService = {
  getAll: async () => {
    return await prisma.homeSlider.findMany({
      orderBy: { order: "asc" },
    });
  }
};

export const updateService = {
  update: async (id: string, data: { image?: string; caption?: string; order?: number }) => {
    return await prisma.homeSlider.update({
      where: { id },
      data: data,
    });
  }
};

export const deleteService = {
  delete: async (id: string) => {
    return await prisma.homeSlider.delete({
      where: { id },
    });
  }
};