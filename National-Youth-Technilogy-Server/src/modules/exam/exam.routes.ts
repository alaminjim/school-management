import { Router } from "express";
import { Role } from "@prisma/client";
import * as examController from "./exam.controller";
import { authorize } from "../../shared/middlewares/authorize.middleware";

const router = Router();

router.post("/questions", authorize(Role.ADMIN), examController.createQuestion);
router.get("/questions", authorize(Role.ADMIN), examController.getAllQuestions);

router.get(
  "/questions/:studentId",
  examController.getQuestionsForStudent,
);
router.post(
  "/submit/:studentId",
  examController.submitExam,
);
router.get(
  "/result/:studentId",
  examController.getStudentResult,
);
router.get("/results", authorize(Role.ADMIN), examController.getAllResults);
router.post("/retry/:studentId", authorize(Role.ADMIN), examController.giveRetry);
router.patch(
  "/questions/:id",
  authorize(Role.ADMIN),
  examController.updateQuestion,
);
router.delete(
  "/questions/:id",
  authorize(Role.ADMIN),
  examController.deleteQuestion,
);

export default router;
