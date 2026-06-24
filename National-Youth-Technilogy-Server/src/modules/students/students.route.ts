import { Router } from "express";
import { validateSchema } from "../../shared/middlewares/zod-validator.middleware";
import {
  createStudent,
  deleteStudent,
  getAllStudentsAdmin,
  getStudentResultByRoll,
  getStudents,
  studentLogin,
  toggleExamAllowed,
  updateStudent,
} from "./students.controller";
import { createStudentSchema, updateStudentSchema } from "./students.validator";
import { authorize } from "../../shared/middlewares/authorize.middleware";

const router = Router();


router.get("/all", authorize("ADMIN"), getAllStudentsAdmin);
router.post("/", authorize("USER"), validateSchema(createStudentSchema), createStudent);
router.get("/", authorize("USER"), getStudents); 
router.patch("/:id", authorize("USER", "ADMIN"), validateSchema(updateStudentSchema), updateStudent);
router.delete("/:id", authorize("USER", "ADMIN"), deleteStudent);
router.get("/result/:roll", getStudentResultByRoll);
router.post("/student-login", studentLogin);
router.patch(
  "/exam-allowed/:id",
  authorize("ADMIN", "USER"),
  toggleExamAllowed,
);



export const studentsRoutes = router;