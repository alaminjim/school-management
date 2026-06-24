import { Router } from "express";
import { CompleteNewController } from "./complete-new.controller";
import { Role } from "@prisma/client";
import { authorize } from "../../shared/middlewares/authorize.middleware";

const router = Router();
// router.get("/pdf-proxy", CompleteNewController.proxyPDF);

router.use(authorize(Role.ADMIN, Role.USER));
router.get("/",      CompleteNewController.getAll);
router.get("/:id",   CompleteNewController.getById);
router.post("/",     CompleteNewController.create);
router.patch("/:id", CompleteNewController.update);
router.delete("/:id", CompleteNewController.delete);



export const completeNewRoutes = router;