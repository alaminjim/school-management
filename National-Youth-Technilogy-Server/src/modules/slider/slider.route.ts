import { Router } from "express";
import { createSlider, deleteSlider, getSliders, updateSlider } from "./slider.controller";
import { authorize } from "../../shared/middlewares/authorize.middleware";
import { Role } from "@prisma/client";

const router = Router();
router.get("/get-slider", getSliders);

router.use(authorize(Role.ADMIN,));
router.post("/add-slider", createSlider);
router.patch("/:id", updateSlider);
router.delete("/:id", deleteSlider);

export const sliderRoutes = router;