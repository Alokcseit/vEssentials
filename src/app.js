import express, { urlencoded } from "express";
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

app.use(express.static("public"));
app.use(urlencoded({ extended: true }));

import bannerRouter from "./routers/banner.router.js";
app.use("/api/v1/banner", bannerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
