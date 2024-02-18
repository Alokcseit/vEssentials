import { Router } from "express";
import upload from "../middlewares.js/multer.middleware.js";
import { getBanner } from "../controllers/banner.controller.js";

const router = Router();

router
  .route("/set")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), getBanner);
export default router;
