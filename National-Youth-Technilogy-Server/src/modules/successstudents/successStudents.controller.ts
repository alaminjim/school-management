import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { createSuccessStudentServer, deleteSuccessStudentService, getSuccessStudentService, updateSuccessStudentService } from "./successStudents.service";


export const createSuccessStudent = catchAsync(async (req, res) => {
  const result = await createSuccessStudentServer.create(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "SuccessStudent created successfully!",
    data: result,
  });
});

export const getAllSuccessStudent = catchAsync(async (req, res) => {
  const result = await getSuccessStudentService.getAll();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "SuccessStudent retrieved successfully!",
    data: result,
  });
});

export const updateSuccessStudent = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await updateSuccessStudentService(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "SuccessStudent updated! 🛠️",
    data: result,
  });
});

// DELETE CONTROLLER
export const deleteSuccessStudent = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  await deleteSuccessStudentService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "SuccessStudent deleted! 🗑️",
    data: null,
  });
});