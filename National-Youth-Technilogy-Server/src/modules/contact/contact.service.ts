import { prisma } from "../../database/prisma";

const createMessage = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  return prisma.contactMessage.create({ data });
};

const getAllMessages = async () => {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getUnreadCount = async () => {
  return prisma.contactMessage.count({
    where: { isRead: false },
  });
};
const deleteMessage = async (id: string) => {
  return prisma.contactMessage.delete({
    where: { id },
  });
};
export const contactService = {
  createMessage,
  getAllMessages,
  getUnreadCount,
  deleteMessage,
};