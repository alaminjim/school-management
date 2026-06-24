import { Router } from "express";
import { Role } from "@prisma/client";
import { contactController } from "./contact.controller";
import { authorize } from "../../shared/middlewares/authorize.middleware";

const router = Router();

router.post("/", contactController.createMessage);

router.get("/", authorize(Role.ADMIN), contactController.getAllMessages);
router.get("/unread-count", authorize(Role.ADMIN), contactController.getUnreadCount);
router.delete("/:id", authorize(Role.ADMIN), contactController.deleteMessage);

export const contactRoutes = router;