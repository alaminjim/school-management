import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { deleteService,  noticeService, updateService } from "./notice.service";

 export const createNotice= catchAsync(async (req: Request, res: Response) => {
  const result = await noticeService.create(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Notice added successfully!",
    data: result,
  });
});

export const getNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await noticeService.getAll();

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Notices fetched successfully!",
    data: result,
  });
});

export const updateNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("Request Body:", req.body);

  const updateData = req.body; 

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "Update data is missing!" });
  }

  const result = await updateService.update(id as string, updateData);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Notice updated successfully!",
    data: result,
  });
});

export const deleteNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteService.delete(id as string);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Notice deleted successfully!",
    data: result,
  });
});