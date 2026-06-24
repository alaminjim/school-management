import { Router } from "express";
import { authorize } from "../../shared/middlewares/authorize.middleware";
import { Role } from "@prisma/client";
import { createHeroImageText, deleteHeroImageText, getHeroImageText, updateHeroImageText } from "./heroImagetext.controller";
const router = Router();
router.get("/get-hero-image-texts", getHeroImageText);

router.use(authorize(Role.ADMIN,));
router.post("/add-hero-image-text", createHeroImageText);
router.patch("/:id", updateHeroImageText);
router.delete("/:id", deleteHeroImageText);

export const HeroImageTextRoutes = router;