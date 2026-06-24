// utils/user-generator.ts

import { prisma } from "../../database/prisma";

export const generateUniqueBranchId = async () => {
  while (true) {
    const branchId = "BR-" + Math.floor(1000000 + Math.random() * 9000000);

    const exist = await prisma.user.findUnique({ where: { branchId } });
    if (!exist) return branchId;
  }
};