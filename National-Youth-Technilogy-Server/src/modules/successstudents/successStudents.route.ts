import { Router } from "express";
import { createSuccessStudent, deleteSuccessStudent, getAllSuccessStudent, updateSuccessStudent } from "./successStudents.controller";

const router = Router();

router.post("/create", createSuccessStudent);
router.get("/", getAllSuccessStudent);
router.put("/:id", updateSuccessStudent);
router.delete("/:id", deleteSuccessStudent);

export const successStudentsRoutes = router;