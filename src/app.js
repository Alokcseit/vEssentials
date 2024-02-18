import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

import bannerRouter from "./routers/banner.router.js";
app.use("/api/v1/banner", bannerRouter);

export { app };
