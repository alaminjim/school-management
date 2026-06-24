import { Router } from "express";
import {
  countCourses,
  
  createCourse,
  deleteCourse,
  
  getCourseById,
  
  getCourses,
  updateCourse,
} from "./courses.controller";
import { authorize } from "../../shared/middlewares/authorize.middleware";
import { Role } from "@prisma/client";

const router = Router();
// router.use(authorize(Role.ADMIN));

router.get("/",  getCourses);
router.get("/count",authorize(Role.ADMIN), countCourses); 
router.post("/",authorize(Role.ADMIN), createCourse);
router.put("/:id", authorize(Role.ADMIN), updateCourse);
router.delete("/:id", authorize(Role.ADMIN), deleteCourse);

router.get("/courses/:id", getCourseById);

export const coursesRoutes = router;
