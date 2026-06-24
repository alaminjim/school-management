import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { deleteService, getService, sliderService, updateService } from "./slider.service";

 export const createSlider = catchAsync(async (req: Request, res: Response) => {
  const result = await sliderService.create(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Slider image added successfully!",
    data: result,
  });
});

export const getSliders = catchAsync(async (req: Request, res: Response) => {
  const result = await getService.getAll();

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Sliders fetched successfully!",
    data: result,
  });
});

export const updateSlider = catchAsync(async (req: Request, res: Response) => {
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
    message: "Slider updated successfully!",
    data: result,
  });
});

export const deleteSlider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteService.delete(id as string);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Slider deleted successfully!",
    data: result,
  });
});