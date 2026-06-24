import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { contactService } from "./contact.service";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.createMessage(req.body);
  sendResponse(res, {
    status: status.CREATED,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.getAllMessages();
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Messages fetched successfully",
    data: result,
  });
});

const getUnreadCount = catchAsync(async (req: Request, res: Response) => {
  const count = await contactService.getUnreadCount();
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Unread count fetched",
    data: { count },
  });
});
const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await contactService.deleteMessage(id as string);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Message deleted successfully",
    data: result,
  });
});

export const contactController = {
  createMessage,
  getAllMessages,
  getUnreadCount,
  deleteMessage,
};