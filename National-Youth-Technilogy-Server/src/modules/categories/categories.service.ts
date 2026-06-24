import { prisma } from "../../database/prisma";
import { CategoryDto, CreateCategoryDto } from "./categories.types";

export const categoriesService = {
  getAll: async (): Promise<CategoryDto[]> => {
    return await prisma.category.findMany();
  },

  create: async (payload: CreateCategoryDto): Promise<CategoryDto> => {
    return await prisma.category.create({
      data: { name: payload.name },
    });
  },

  update: async (id: string, data: Partial<CategoryDto>): Promise<CategoryDto> => {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new Error("Category not found");

  return await prisma.category.update({
    where: { id },
    data,
  });
},

delete: async (id: string): Promise<CategoryDto> => {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new Error("Category not found");
  
  return await prisma.category.delete({
    where: { id },
  });
},
};