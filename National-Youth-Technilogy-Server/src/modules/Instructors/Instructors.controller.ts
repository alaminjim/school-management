import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { createInstructorsServer, deleteInstructorsService, getInstructorsService, updateInstructorsService } from "./Instructors.service";


export const createInstructors = catchAsync(async (req, res) => {
  const result = await createInstructorsServer.create(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Instructors created successfully!",
    data: result,
  });
});

export const getAllInstructors = catchAsync(async (req, res) => {
  const result = await getInstructorsService.getAll();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Instructors retrieved successfully!",
    data: result,
  });
});

export const updateInstructors = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await updateInstructorsService(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Instructor updated! 🛠️",
    data: result,
  });
});

// DELETE CONTROLLER
export const deleteInstructors = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  await deleteInstructorsService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Instructor deleted! 🗑️",
    data: null,
  });
});