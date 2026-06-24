import { Router } from "express";
import { createStudentMarks, deleteMark, getStudentMarks, updateMark } from "./marks.controller";

const router = Router();

router.post("/:studentId", createStudentMarks);
router.get("/:studentId", getStudentMarks);
router.delete("/:markId", deleteMark);
router.put("/:markId", updateMark);

export const marksRoutes = router;