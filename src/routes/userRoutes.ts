import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();

// POST /api/signup - Create a new user
userRoutes.post("/signup", UserController.signup);

// GET /api/users - Get all users (optional, for testing/admin)
userRoutes.get("/users", UserController.getAllUsers);

// GET /api/users/:id - Get user by ID
userRoutes.get("/users/:id", UserController.getUserById);

export default userRoutes;
