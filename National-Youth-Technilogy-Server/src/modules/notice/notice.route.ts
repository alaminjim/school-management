import { Router } from "express";
import { authorize } from "../../shared/middlewares/authorize.middleware";
import { Role } from "@prisma/client";
import { createNotice, deleteNotice,  getNotice,  updateNotice } from "./notice.controller";

const router = Router();
router.get("/get-notices", getNotice);

router.use(authorize(Role.ADMIN,));
router.post("/add-notice", createNotice);
router.patch("/:id", updateNotice);
router.delete("/:id", deleteNotice);

export const noticeRoutes = router;