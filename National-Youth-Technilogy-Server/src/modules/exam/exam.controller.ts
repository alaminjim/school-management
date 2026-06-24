/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { examService } from "./exam.service";

export const createQuestion = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await examService.createQuestion(req.body, user.id);

    sendResponse(res, {
      status: 201,
      success: true,
      message: "Question created successfully",
      data: result,
    });
  },
);

export const getAllQuestions = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await examService.getAllQuestions(user.id);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Questions fetched",
      data: result,
    });
  },
);

export const getQuestionsForStudent = catchAsync(
  async (req: Request, res: Response) => {
    // const user = (req as any).user;
    const { studentId } = req.params;

    const result = await examService.getQuestionsForStudent(studentId as string );

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Exam questions fetched",
      data: result,
    });
  },
);

export const submitExam = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { answers } = req.body;

  const result = await examService.submitExam(studentId as string, answers);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Exam submitted successfully",
    data: result,
  });
});

export const getStudentResult = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const result = await examService.getStudentResult(studentId as string);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Results fetched",
      data: result,
    });
  },
);

export const getAllResults = catchAsync(async (req: Request, res: Response) => {
  const result = await examService.getAllResults();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All results fetched",
    data: result,
  });
});

export const giveRetry = catchAsync(async (req: Request, res: Response) => {
  const studentId = Array.isArray(req.params.studentId) 
    ? req.params.studentId[0] 
    : req.params.studentId;
    
  const result = await examService.giveRetry(studentId);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Retry granted!",
    data: result,
  });
});

export const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await examService.deleteQuestion(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Question deleted!",
    data: result,
  });
});

export const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await examService.updateQuestion(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Question updated!",
    data: result,
  });
});