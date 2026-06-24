import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { marksService } from "./marks.service";

export const createStudentMarks = catchAsync(async (req: Request, res: Response) => {
  const studentId = Array.isArray(req.params.studentId)
    ? req.params.studentId[0]
    : req.params.studentId;

  console.log(" BODY:", req.body);

  const result = await marksService.createMarks(studentId, req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Student marks saved successfully!",
    data: result,
  });
});

export const getStudentMarks = catchAsync(async (req: Request, res: Response) => {
  const studentId = Array.isArray(req.params.studentId)
    ? req.params.studentId[0]
    : req.params.studentId;

  const result = await marksService.getMarksByStudent(studentId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Marks fetched successfully",
    data: result,
  });
});

export const deleteMark = catchAsync(async (req: Request, res: Response) => {
  const markId = req.params.markId as string;
  const result = await marksService.deleteMark(markId);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Mark deleted successfully",
    data: result,
  });
});

export const updateMark = catchAsync(async (req: Request, res: Response) => {
  const markId = req.params.markId as string;
  const result = await marksService.updateMark(markId, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Mark updated successfully",
    data: result,
  });
});