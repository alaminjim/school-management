import { Router } from "express";
import { createInstructors, deleteInstructors, getAllInstructors, updateInstructors } from "./Instructors.controller";

const router = Router();

router.post("/create", createInstructors);
router.get("/", getAllInstructors);
router.put("/:id", updateInstructors);
router.delete("/:id", deleteInstructors);

export const instructorsRoutes = router;