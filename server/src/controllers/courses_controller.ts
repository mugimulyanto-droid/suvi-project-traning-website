import { type NextFunction, type Request, type Response } from "express";
// import { type getCourseResponse } from "../models/courses";

export class CoursesController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        data: "oke",
      });
    } catch (error) {
      next(error);
    }
  }
}
