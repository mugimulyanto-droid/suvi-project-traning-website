import express from "express";
import { CoursesController } from "../controllers/courses_controller";
import { RegistrationController } from "../controllers/registration_controller";
import { ProdukController } from "../controllers/produk_controller";

export const publicRouter = express.Router();

const produkController = new ProdukController();

// Course management routes
publicRouter.get("/courses", CoursesController.get);
publicRouter.post("/courses", CoursesController.create);
publicRouter.put("/courses/:id", CoursesController.update);
publicRouter.delete("/courses/:id", CoursesController.delete);

// Registration routes
publicRouter.post("/register", RegistrationController.register);
publicRouter.get("/registrations", RegistrationController.getAll);
publicRouter.delete("/registrations/:id", RegistrationController.delete);

// Produk management routes
publicRouter.get("/products", (req, res) => produkController.getAllProduk(req, res));
publicRouter.get("/products/:id", (req, res) => produkController.getProdukById(req, res));
publicRouter.post("/products", (req, res) => produkController.createProduk(req, res));
publicRouter.put("/products/:id", (req, res) => produkController.updateProduk(req, res));
publicRouter.delete("/products/:id", (req, res) => produkController.deleteProduk(req, res));
