import { Request, Response } from "express";
import { UserModel, CreateUserRequest } from "../models/User";

export class UserController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const {
        fullName,
        email,
        password,
        createdDate,
        userType,
      }: CreateUserRequest = req.body;

      // Basic validation
      if (!fullName || !email || !password || !createdDate || !userType) {
        res.status(400).json({
          error: "Missing required fields",
          required: [
            "fullName",
            "email",
            "password",
            "createdDate",
            "userType",
          ],
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          error: "Invalid email format",
        });
        return;
      }

      // Check if user already exists
      const existingUser = UserModel.findByEmail(email);
      if (existingUser) {
        res.status(409).json({
          error: "User with this email already exists",
        });
        return;
      }

      // Validate userType
      const validUserTypes = ["student", "teacher", "admin"];
      if (!validUserTypes.includes(userType)) {
        res.status(400).json({
          error: "Invalid user type",
          validTypes: validUserTypes,
        });
        return;
      }

      // Validate password strength (basic example)
      if (password.length < 6) {
        res.status(400).json({
          error: "Password must be at least 6 characters long",
        });
        return;
      }

      // Create user
      const newUser = UserModel.create({
        fullName,
        email,
        password,
        createdDate,
        userType,
      });

      // Return success response
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = UserModel.getAll();
      res.status(200).json({
        message: "Users retrieved successfully",
        users,
        count: users.length,
      });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = UserModel.findById(id);

      if (!user) {
        res.status(404).json({
          error: "User not found",
        });
        return;
      }

      // Remove password from response
      const { password, ...userResponse } = user;

      res.status(200).json({
        message: "User retrieved successfully",
        user: userResponse,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}
