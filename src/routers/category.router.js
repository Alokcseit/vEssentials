import { Router } from "express";
import upload from "../middlewares.js/multer.middleware.js";
import {
  getCategory,
  setCategory,
} from "../controllers/category.controller.js";
const router = Router();

router
  .route("/set")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), setCategory);

router.route("/get").get(getCategory);
export default router;
