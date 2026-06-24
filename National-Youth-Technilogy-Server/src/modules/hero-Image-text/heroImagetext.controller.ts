import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { deleteService, heroImageTextService, updateService } from "./heroImagetext.service";

 export const createHeroImageText = catchAsync(async (req: Request, res: Response) => {
  const result = await heroImageTextService.create(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Hero image text added successfully!",
    data: result,
  });
});

export const getHeroImageText = catchAsync(async (req: Request, res: Response) => {
  const result = await heroImageTextService.getAll();

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Hero image texts fetched successfully!",
    data: result,
  });
});

export const updateHeroImageText = catchAsync(async (req: Request, res: Response) => {
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

export const deleteHeroImageText = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteService.delete(id as string);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Hero image text deleted successfully!",
    data: result,
  });
});