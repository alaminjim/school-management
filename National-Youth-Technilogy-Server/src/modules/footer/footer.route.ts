import { Router } from "express";
import {
  createFooter,
  deleteFooter,
  getFooter,
  updateFooter,
} from "./footer.controller";

const router = Router();

router.post("/", createFooter);
router.get("/", getFooter);
router.patch("/:id", updateFooter);
router.delete("/:id", deleteFooter);

export const footerRoutes = router;
