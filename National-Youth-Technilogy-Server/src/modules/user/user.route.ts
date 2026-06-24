import { Router } from "express";
import { Role } from "@prisma/client";
import { userController } from "./user.controller";
import { authorize } from "../../shared/middlewares/authorize.middleware";

const router = Router();

router.get("/", authorize(Role.ADMIN), userController.getAllUsers);
router.patch("/:userId/approve", authorize(Role.ADMIN), userController.approveUser);
router.patch("/:userId/block", authorize(Role.ADMIN), userController.blockUser);
router.delete("/:userId", authorize(Role.ADMIN), userController.deleteUser);
router.patch("/:userId/unblock", authorize(Role.ADMIN), userController.unblockUser);
router.patch("/update-profile", authorize(Role.USER, Role.ADMIN), userController.updateUser);
router.get("/approved", userController.getApprovedUsers);

export const userRoutes = router;