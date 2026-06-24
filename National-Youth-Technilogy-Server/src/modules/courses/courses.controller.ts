import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { coursesService } from "./courses.service";


export const getCourses = catchAsync(async (_req: Request, res: Response) => {
  const result = await coursesService.getAll();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Courses fetched",
    data: result,
  });
});

export const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await coursesService.create(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Course created",
    data: result,
  });
});

export const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  await coursesService.delete(id);
  sendResponse(res, { status: 200, success: true, message: "Course deleted" });
});

export const countCourses = catchAsync(async (_req: Request, res: Response) => {
  const result = await coursesService.count();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Course count",
    data: result,
  });
});

export const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { ...data } = req.body; 
  const result = await coursesService.update(id, data);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

export const getCourseById = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await coursesService.getById(id);
  
  if (!result) {
    return res.status(404).json({ message: "Course not found" });
  }

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Course details fetched",
    data: result,
  });
});
