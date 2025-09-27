import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();

userRoutes.post("/signup", UserController.signup);

userRoutes.get("/users/:id", UserController.getUserById);

export default userRoutes;
