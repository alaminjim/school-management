import { prisma } from "../../database/prisma";
import { Prisma } from "@prisma/client";

export const footerService = {
  create: async (data: {
    footerImage: string;
    content: Prisma.InputJsonValue;
  }) => {
    return await prisma.footer.create({
      data: { footerImage: data.footerImage, content: data.content },
    });
  },

  getFooter: async () => {
    return await prisma.footer.findFirst();
  },

  updateFooter: async (
    id: string,
    data: { footerImage?: string; content?: Prisma.InputJsonValue },
  ) => {
    return await prisma.footer.update({
      where: { id },
      data: { ...data },
    });
  },

  deleteFooter: async (id: string) => {
    return await prisma.footer.delete({
      where: { id },
    });
  },
};
