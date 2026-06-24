/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { studentsService } from "./students.service";
import { AppError } from "../../shared/errors/app-error";
import { createStudentSchema } from "./students.validator";

//*  admin
export const getAllStudentsAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await studentsService.getAll(req.query as any);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "All students fetched",
    data: result,
  });
});

export const createStudent = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user || !user.id) {
    throw new AppError(401, "User not authenticated!");
  }

  const data = createStudentSchema.parse(req.body);
  const result = await studentsService.create(data, user.id);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Student created successfully!",
    data: result,
  });
});

export const getStudents = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await studentsService.getAll({
    ...req.query,
    userId: user?.id, 
  } as any);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Students fetched",
    data: result,
  });
});

export const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await studentsService.update(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Student updated",
    data: result,
  });
});

export const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  await studentsService.delete(id);
  sendResponse(res, { status: 200, success: true, message: "Student deleted" });
});

export const getStudentResultByRoll = catchAsync(async (req: Request, res: Response) => {
  const roll = req.params.roll as string;
  const result = await studentsService.getResultByRoll(roll);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Result fetched",
    data: result,
  });
});

// Student Login
export const studentLogin = catchAsync(async (req: Request, res: Response) => {
  const { email, guardianPhone } = req.body;

  if (!email || !guardianPhone) {
    throw new AppError(400, "Email and guardianPhone are required!");
  }

  const result = await studentsService.studentLogin(email, guardianPhone);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Student verified successfully!",
    data: result,
  });
});

//  Admin: Student exam allow/disallow
export const toggleExamAllowed = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await studentsService.toggleExamAllowed(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: result.examAllowed ? "Exam allowed!" : "Exam disallowed!",
    data: result,
  });
});