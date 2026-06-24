import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { coursesRoutes } from "../modules/courses/courses.route";
import { sliderRoutes } from "../modules/slider/slider.route";
import { studentsRoutes } from "../modules/students/students.route";
import { testimonialsRoutes } from "../modules/testimonials/testimonials.route";
import { instructorsRoutes } from "../modules/Instructors/Instructors.route";
import { successStudentsRoutes } from "../modules/successstudents/successStudents.route";
import { contactRoutes } from "../modules/contact/contact.route";
import { categoriesRoutes } from "../modules/categories/categories.route";
import { userRoutes } from "../modules/user/user.route";
import { marksRoutes } from "../modules/marks/mark.routes";
import { taskDataRoutes } from "../modules/task-data/task-data.routes";
import { completeNewRoutes } from "../modules/complete-new/complete-new.routes";
import { noticeRoutes } from "../modules/notice/notice.route";
import { HeroImageTextRoutes } from "../modules/hero-Image-text/heroImagetext.route";
import { AboutSectionRoutes } from "../modules/abou-section/aboutsection.route";
import examRoutes from "../modules/exam/exam.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/slider", sliderRoutes);
router.use("/users", userRoutes);
router.use("/courses", coursesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/students", studentsRoutes);
router.use("/testimonials", testimonialsRoutes);
router.use("/instructors", instructorsRoutes);
router.use("/successStudents", successStudentsRoutes);
router.use("/contact", contactRoutes);
router.use("/marks", marksRoutes);
router.use('/task-data', taskDataRoutes);
router.use("/complete-new", completeNewRoutes);
router.use("/notices", noticeRoutes);
router.use("/hero-image-text", HeroImageTextRoutes);
router.use("/about-section", AboutSectionRoutes);
router.use("/exam", examRoutes);


export const apiRoutes = router;
