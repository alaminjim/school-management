/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import { prisma } from "../../database/prisma";
import { AppError } from "../../shared/errors/app-error";

// const getAllUsers = async () => {
//   return prisma.user.findMany({
//     where: { isDeleted: false },
//   });
// };

const getAllUsers = async (search?: string) => {
  return prisma.user.findMany({
    where: {
      isDeleted: false,
      role: "USER",
      ...(search && {
        OR: [
          { branchId: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
  });
};

const approveUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new AppError(status.NOT_FOUND, "User not found");
  if (user.status !== "PENDING") throw new AppError(status.BAD_REQUEST, "User is not pending");

  return prisma.user.update({
    where: { id: userId },
    data: { status: "ACTIVE" },
  });
};

const blockUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new AppError(status.NOT_FOUND, "User not found");
  if (user.status === "BLOCKED") throw new AppError(status.BAD_REQUEST, "User is already blocked");

  return prisma.user.update({
    where: { id: userId },
    data: { status: "BLOCKED" },
  });
};

const deleteUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new AppError(status.NOT_FOUND, "User not found");

  return prisma.user.update({
    where: { id: userId },
    data: { status: "DELETED", isDeleted: true, deletedAt: new Date() },
  });
};

const unblockUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new AppError(status.NOT_FOUND, "User not found");
  if (user.status !== "BLOCKED") throw new AppError(status.BAD_REQUEST, "User is not blocked");

  return prisma.user.update({
    where: { id: userId },
    data: { status: "ACTIVE" },
  });
};
const updateUser = async (userId: string, data: any) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new AppError(status.NOT_FOUND, "User not found");

  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

// const getApprovedUsers = async () => {
//   return prisma.user.findMany({
//     where: {
//       status: "ACTIVE",
//       role: "USER",
//       isDeleted: false,
//     },
//   });
// };

const getApprovedUsers = async () => {
  return prisma.user.findMany({
    where: {
      status: "ACTIVE",
      role: "USER",
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      instituteName: true,
      directorName: true,
      gender: true,
      nationality: true,
      fatherName: true,
      motherName: true,
      fullAddress: true,
      village: true,
      postOffice: true,
      thanaUpazila: true,
      district: true,
      courseName: true,
      duration: true,
      startYear: true,
      startMonth: true,
      endYear: true,
      endMonth: true,
      educationQualification: true,
      directorPhoto: true,
      institutePhoto: true,
      instituteAge: true,
      religion: true,
      branchId: true,
      username: true,
    },
  });
};

export const userService = {
  getAllUsers,
  approveUser,
  blockUser,
  deleteUser,
  unblockUser,
  updateUser,
  getApprovedUsers,
};