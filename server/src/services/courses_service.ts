import dbPool from "../application/database.js";
import { type getCourseResponse } from "../models/courses.js";

export class CoursesService {
  static async getAll(): Promise<getCourseResponse[]> {
    const response = dbPool.query("SELECT * FROM kursus");
    console.log(response);
  }
}
console.log("hello world");
CoursesService.getAll();
