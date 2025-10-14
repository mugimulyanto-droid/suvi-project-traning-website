import express from "express";
import cors from "cors";
import { config } from "./config/index.js";

export const web = express();
web.use(express.json());
web.use(cors());
