import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { aboutSectionService, deleteService, updateService } from "./aboutsection.service";


 export const createAboutSection = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutSectionService.create(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "About section added successfully!",
    data: result,
  });
});

export const getAboutSection = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutSectionService.getAll();

  sendResponse(res, {
    status: 200,
    success: true,
    message: "About sections fetched successfully!",
    data: result,
  });
});

export const updateAboutSection = catchAsync(async (req: Request, res: Response) => {
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
    message: "About section updated successfully!",
    data: result,
  });
});

export const deleteAboutSection = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteService.delete(id as string);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "About section deleted successfully!",
    data: result,
  });
});