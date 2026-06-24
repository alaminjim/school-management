import { Router } from "express";
import { createCategory, deleteCategory, getCategories,  updateCategory } from "./categories.controller";


const router = Router();


router.get("/", getCategories);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export const categoriesRoutes = router;
