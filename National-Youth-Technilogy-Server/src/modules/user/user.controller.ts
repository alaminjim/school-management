import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { userService } from "./user.service";
import { IRequestUser } from "../auth/auth.type";

// const getAllUsers = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.getAllUsers();
//   sendResponse(res, {
//     status: status.OK,
//     success: true,
//     message: "Users fetched successfully",
//     data: result,
//   });
// });

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const search = req.query.search as string | undefined;
  const result = await userService.getAllUsers(search);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

const approveUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await userService.approveUser(userId as string);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User approved successfully",
    data: result,
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await userService.blockUser(userId as string);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await userService.deleteUser(userId as string);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await userService.unblockUser(userId as string);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User unblocked successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  const result = await userService.updateUser(user.id, req.body);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const getApprovedUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getApprovedUsers();
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Approved users fetched successfully",
    data: result,
  });
});

export const userController = {
  getAllUsers,
  approveUser,
  blockUser,
  deleteUser,
  unblockUser,
  updateUser,
  getApprovedUsers,

};