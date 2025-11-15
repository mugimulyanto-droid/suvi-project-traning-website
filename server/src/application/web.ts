import express from "express";
import cors from "cors";

import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../routes/public-api";

export const web = express();
web.use(express.json());
web.use(cors());

web.use("/api", publicRouter);
web.use(errorMiddleware);
