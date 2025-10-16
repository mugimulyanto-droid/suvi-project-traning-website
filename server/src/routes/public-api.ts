import express from "express";
import { CoursesController } from "../controllers/courses_controller.js";

export const publicRouter = express.Router();
publicRouter.get("/api/courses", CoursesController.get);
