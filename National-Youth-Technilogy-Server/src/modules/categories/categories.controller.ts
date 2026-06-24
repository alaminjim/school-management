import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { categoriesService } from "./categories.service";
import { CreateCategoryDto } from "./categories.types";

export const getCategories = catchAsync(async (_req: Request, res: Response) => {
  const result = await categoriesService.getAll();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Categories fetched",
    data: result,
  });
});

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const payload: CreateCategoryDto = req.body;
  const result = await categoriesService.create(payload);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Category created",
    data: result,
  });
});


export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoriesService.update(id as string, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Category updated",
    data: result,
  });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoriesService.delete(id as string);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Category deleted",
    data: result,
  });
});