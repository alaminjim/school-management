import { Router } from "express";
import { createTestimonials, deleteTestimonial, getAllTestimonials, updateTestimonial } from "./testimonials.controller";

const router = Router();

router.post("/create", createTestimonials);
router.get("/", getAllTestimonials);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

export const testimonialsRoutes = router;