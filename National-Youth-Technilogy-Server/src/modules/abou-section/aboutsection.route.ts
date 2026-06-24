import { Router } from "express";
import { authorize } from "../../shared/middlewares/authorize.middleware";
import { Role } from "@prisma/client";
import { createAboutSection, deleteAboutSection, getAboutSection, updateAboutSection } from "./aboutsection.controller";
const router = Router();

router.get("/get-about-sections", getAboutSection);

router.use(authorize(Role.ADMIN,));
router.post("/add-about-section", createAboutSection);
router.patch("/:id", updateAboutSection);
router.delete("/:id", deleteAboutSection);

export const AboutSectionRoutes = router;